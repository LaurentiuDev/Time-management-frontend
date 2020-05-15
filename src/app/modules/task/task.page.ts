import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { TaskNewComponent } from './components/task-new/task-new.component';
import { TaskService } from './task.service';
import { Task } from 'src/app/models/task.model';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    public modalController: ModalController,
    public taskService: TaskService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe();
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

  async onRemoveItem(id: string) {
    console.log(1)
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
