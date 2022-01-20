import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LudotekaComponent } from './group-b/ludoteka/ludoteka.component';
import { GymComponent } from './group-a/gym/gym.component';
import { ClimbingWallComponent } from './group-a/climbing-wall/climbing-wall.component';
import { ChildrensGameComponent } from './group-a/childrens-game/childrens-game.component';
import { InteractiveFontComponent } from './group-b/interactive-font/interactive-font.component';
import { MultipurposeTrackComponent } from './group-b/multipurpose-track/multipurpose-track.component';
import { PoolComponent } from './group-b/pool/pool.component';
import { SkateTrackComponent } from './group-b/skate-track/skate-track.component';
import { AdministrativeComponent } from './group-a/administrative/administrative.component';
import { CourtComponent } from './group-a/court/court.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { RecreationalNucleusComponent } from './group-b/recreational-nucleus/recreational-nucleus.component';



@NgModule({
  declarations: [
    LudotekaComponent, 
    RecreationalNucleusComponent, 
    GymComponent, 
    ClimbingWallComponent, 
    ChildrensGameComponent, 
    InteractiveFontComponent, 
    MultipurposeTrackComponent,
    PoolComponent,
    SkateTrackComponent,
    AdministrativeComponent,
    CourtComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    MaterialModule,
    SharedModule,
    InlineSVGModule,
  ],
  exports:[   LudotekaComponent, 
    RecreationalNucleusComponent, 
    GymComponent, 
    ClimbingWallComponent, 
    ChildrensGameComponent, 
    InteractiveFontComponent, 
    MultipurposeTrackComponent,
    PoolComponent,
    SkateTrackComponent,
    AdministrativeComponent,
    CourtComponent,]
})
export class TypeScenariosDiagnosisModule { }
