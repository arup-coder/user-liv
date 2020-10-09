import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as userStore from '@nxl/user-lib';
import * as configurationStore from '@nxl/configuration-lib';
import * as fromAppFunctions from '../../functions/index';
import * as fromConfiguration from '@nxl/configuration-lib';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-home-amplify',
  templateUrl: './app-home-amplify.component.html',
  styleUrls: ['./app-home-amplify.component.scss'],
})
export class AppHomeAmplifyComponent implements OnInit {
  userTenantIds: string[];
  tenantRequest: any;
  logoBanner: any;
  platformSettings: any;
  userDetail: any;
  showStatus: boolean;
  showQuiz: boolean;

  ELEMENT_DATA: CampaignStat[] = [
    {
      CampaignTitle: 'Pellentesque habitant morbi tristique',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
    {
      CampaignTitle: 'Senectus et netus et malesuada fames',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
    {
      CampaignTitle: 'Etiam non lacus ac leo elementum lobortis',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
    {
      CampaignTitle: 'Pellentesque habitant morbi tristique',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
    {
      CampaignTitle: 'Pellentesque habitant morbi tristique',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
    {
      CampaignTitle: 'Pellentesque habitant morbi tristique',
      TotalGoal: 200,
      GoalCompleted: 70,
      DaysRemaining: 5,
    },
  ];
  displayedColumns: string[] = ['CampaignTitle', 'TotalGoal', 'GoalCompleted', 'DaysRemaining'];
  dataSource: any;

  ELEMENT_DATA2: QuizStat[] = [
    {
      QuizTitle: 'Pellentesque habitant morbi tristique',
      Questions: 200,
      Status: 'Pass',
      Points: 5,
    },
    {
      QuizTitle: 'Senectus et netus et malesuada fames',
      Questions: 200,
      Status: 'Pass',
      Points: 5,
    },
    {
      QuizTitle: 'Etiam non lacus ac leo elementum lobortis',
      Questions: 200,
      Status: 'Fail',
      Points: 5,
    },
    {
      QuizTitle: 'Pellentesque habitant morbi tristique',
      Questions: 200,
      Status: 'Fail',
      Points: 5,
    },
    {
      QuizTitle: 'Pellentesque habitant morbi tristique',
      Questions: 200,
      Status: 'Pass',
      Points: 5,
    },
    {
      QuizTitle: 'Pellentesque habitant morbi tristique',
      Questions: 200,
      Status: 'Pass',
      Points: 5,
    },
  ];
  quizColumn: string[] = ['QuizTitle', 'Questions', 'Status', 'Points'];
  quizData: any;

  constructor(
    @Inject('env') private env,
    public route: ActivatedRoute,
    public router: Router,
    private fromUserStore: Store<userStore.UserState>,
    private fromConfigurationStore: Store<configurationStore.ConfigurationState>,
    private url: LocationStrategy,
  ) {
    this.dataSource = this.ELEMENT_DATA;
    this.quizData = this.ELEMENT_DATA2;
    this.fromConfigurationStore
      .pipe(select(configurationStore.getSelectedPlatformSettings))
      .pipe(tap(settings => (this.platformSettings = settings)))
      .subscribe();
    this.showStatus = false;
    this.showQuiz = false;
  }
  ngOnInit() {
    this.fromUserStore
      .pipe(select(userStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail = userData)))
      .subscribe();
    if (this.userDetail !== null) {
      if (this.userDetail[0].isRegistered === false) {
        this.router.navigate(['/user/user-registration']);
      } else if (this.userDetail[0].isRegistered === true) {
        const routeName = this.checkIsFooterRoute();
        this.router.navigate([fromAppFunctions.funGetAppRoute(this.env.application, routeName)]);
      } else if (this.userDetail[0].firstName === undefined) {
        this.getRegistrationFields();
      }
    }
    window.scroll(0, 0);
  }

  checkIsFooterRoute() {
    if (window.location.href.includes('GPDR')) {
      return 'gpdr';
    } else if (window.location.href.includes('contact')) {
      return 'contact';
    }  else if (window.location.href.includes('privacy')) {
      return 'privacy';
    } else if (window.location.href.includes('terms')) {
      return 'terms';
    }  else {
      return 'home';
    }
  }

  getRegistrationFields() {
    this.fromConfigurationStore
      .pipe(
        select(fromConfiguration.getSelectedRegistrationFieldsSettings),
        tap(fieldsNames => {
          // load fields names
          if (fieldsNames !== null) {
            this.fromUserStore.dispatch(
              userStore.loadUserFieldsNames({
                payload: fieldsNames.registrationFields,
              }),
            );
            this.router.navigate(['/user/user-registration']);
          }
        }),
      )
      .subscribe();
  }

  onClickStatusViewList() {
    this.showStatus = true;
  }
  onClickStatusChart() {
    this.showStatus = false;
  }

  onClickQuizViewList() {
    this.showQuiz = true;
  }
  onClickQuizChart() {
    this.showQuiz = false;
  }
}

export interface CampaignStat {
  CampaignTitle: string;
  TotalGoal: number;
  GoalCompleted: number;
  DaysRemaining: number;
}
export interface QuizStat {
  QuizTitle: string;
  Questions: number;
  Status: string;
  Points: number;
}
