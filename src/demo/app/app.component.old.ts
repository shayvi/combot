import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2TreeSettings, NodeEvent, RenamableNode, TreeModel } from '../../../index';
import { NodeMenuItemAction } from '../../menu/menu.events';
import { MenuItemSelectedEvent } from '../../tree.events';

declare const alertify: any;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit {
  public settings: Ng2TreeSettings = {
    rootIsVisible: false
  };


  public ffs: TreeModel;

  private lastFFSNodeId = 86;

  @ViewChild('treeFFS') public treeFFS;


  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.ffs = {
    value: '/',
    id: 1,
    settings: {
      cssClasses: {
        expanded: 'fa fa-caret-down',
        collapsed: 'fa fa-caret-right',
        empty: 'fa fa-caret-right disabled',
        leaf: 'fa'
      },
      templates: {
        node: '<i class="fa fa-folder-o"></i>',
        leaf: '<i class="fa fa-link"></i>'
      }
    },
    children: [

      {
        value: 'home',
        id: 37,
        children: [
          {
            value: 'firstUser',
            id: 38,
            children: [
              {
                value: 'Documents',
                id: 39,
                children: [
                  {
                    value: 'home',
                    id: 40,
                    children: [
                      {
                        value: 'bills',
                        id: 41,
                        children: [
                          {value: '2016-07-01-mobile.pdf', id: 42},
                          {value: '2016-07-01-electricity.pdf', id: 43},
                          {value: '2016-07-01-water.pdf', id: 44},
                          {value: '2016-07-01-internet.pdf', id: 45},
                          {value: '2016-08-01-mobile.pdf', id: 46},
                          {value: '2016-10-01-internet.pdf', id: 47}
                        ]
                      },
                      {value: 'photos', id: 48, children: []}
                    ]
                  }
                ]
              },
              {value: 'Downloads', id: 49, children: []},
              {value: 'Desktop', id: 50, children: []},
              {value: 'Pictures', id: 51, children: []},
              {
                value: 'Music',
                id: 52,
                children: [{value: 'won\'t be displayed'}],
                loadChildren: (callback) => {
                  setTimeout(() => {
                    callback([
                      {value: '2Cellos', id: 78, children: []},
                      {value: 'Michael Jackson', id: 79, children: []},
                      {value: 'AC/DC', id: 80, children: []},
                      {value: 'Adel', id: 81, children: []}
                    ]);
                  }, 5000);
                }
              },
              {value: 'Public', id: 53, children: []}
            ]
          },
          {
            value: 'secondUser - left menu templates',
            id: 54,
            settings: {
              leftMenu: true
            },
            children: [
              {value: 'Documents', id: 55, children: []},
              {
                value: 'Downloads - custom left menu template',
                id: 56,
                settings: {
                  templates: {
                    leftMenu: '<i class="fa fa-navicon"></i>'
                  }
                },
                children: [
                  {value: 'Actobat3', id: 57},
                  {value: 'Complib', id: 58},
                  {value: 'Eudora', id: 59},
                  {value: 'java', id: 60},
                  {value: 'drivers', id: 61},
                  {value: 'kathy', id: 62}
                ]
              },
              {value: 'Desktop', id: 63, children: []},
              {value: 'Pictures', id: 64, children: []},
              {value: 'Music', id: 65, children: []},
              {value: 'Public', id: 66, children: []}
            ]
          }
        ]
      },
    ]
      };
    }, 2000);
  }

  public onNodeRemoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Created');
  }

  public onNodeFFSCreated(e: NodeEvent, controller): void {
    AppComponent.logEvent(e, 'Created');
    if (controller) {
      controller.changeNodeId(++this.lastFFSNodeId);
    }
  }

  public onNodeSelected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Selected');
  }

  public onMenuItemSelected(e: MenuItemSelectedEvent) {
    AppComponent.logEvent(e, `You selected ${e.selectedItem} menu item`);
  }

  public onNodeExpanded(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Collapsed');
  }

  public handleActionOnFFS(id: number | string, action: string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public renameFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.rename('unicode.pf');
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public setChildrenFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController.setChildren === 'function') {
      treeController.setChildren([
        {value: 'apache2', id: 82, children: []},
        {value: 'nginx', id: 83, children: []},
        {value: 'dhcp', id: 84, children: []},
        {value: 'dpkg', id: 85, children: []},
        {value: 'gdb', id: 86, children: []}
      ]);
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public addChildFFS(id: number | string, newNode: TreeModel) {
    newNode.id = ++this.lastFFSNodeId;
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.addChild(newNode);
    } else {
      console.log(`Controller is absent for a node with id: ${id}`);
    }
  }
}
