import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TournamentProvider} from "../../providers/tournament/tournament";
import {Tournament} from "../../model/tournament";
import {Player} from "../../model/player";
import * as PlayerModel from "../../model/player";

@IonicPage()
@Component({
  selector: 'page-tournament-player',
  templateUrl: 'tournament-player.html',
})
export class TournamentPlayerPage {

  private tournament: Tournament;
  private currentPlayer: Player = new Player();
  showPlayer: boolean = false;
  ExperienceArray = PlayerModel.ExperienceArray;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tournamentProvider: TournamentProvider) {
    this.tournament = navParams.get('tournament');
    console.log(this.currentPlayer);
  }

  savePlayer() {
    this.showPlayer = !this.showPlayer;
    this.tournament.participants.push(this.currentPlayer);
    this.currentPlayer = new Player();
  }

  addPlayerFunction() {
    this.showPlayer = !this.showPlayer;
  }

  startTournament() {
    if (this.tournament.participants.length <= 4) {
      this.tournament.createTeams();
      this.tournamentProvider.createTournament(this.tournament)
        .then(_ => {
          this.navCtrl.push('TournamentPlayerPage');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

}
