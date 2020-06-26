import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskService } from './task.service';
import { Task } from 'src/app/models/task.model';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalController: ModalController,
    public taskService: TaskService,
    private alertController: AlertController,
    private platform: Platform,
    private localNotifications: LocalNotifications,
  ) {

  }

  ngOnInit() {
    this.taskService.getTasks().subscribe();
    this.subscriptions.push(
      //this.platform.ready().then(() => {
      this.localNotifications.on('trigger').subscribe(res => {
        this.presentAlert('Your notifiations contains a secret = ');
        //this.presentAlert('Your notifiations contains a secret = ' + res.trigger.at);
      })
      //});
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async onAddItem() {
    const modal = await this.modalController.create({
      component: TaskNewComponent,
      swipeToClose: true,
    });
    return await modal.present();
  }

  async onEditItem(task: Task) {
    const modal = await this.modalController.create({
      component: TaskDetailComponent,
      swipeToClose: true,
      componentProps: {
        data: task
      }
    });
    return await modal.present();
  }

  public onCompleteTask(task: Task, event) {
    if (event.target.checked && !task.completed) {
      task.completed = true;
      this.taskService.update(task).subscribe();
    }
  }

  async onRemoveItem(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you want to delete the selected item ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: () => {
            this.taskService.deleteTask(id).subscribe();
          }
        }
      ]
    });

    await alert.present();
  }

  loadTasks(event) {
    if (this.taskService.count === this.taskService.pageSize) {
      this.taskService.getTasks(true).subscribe((_) => {
        event.target.complete();
      });
    } else {
      event.target.disabled = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
