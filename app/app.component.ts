import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2TreeSettings, NodeEvent, RenamableNode, TreeModel } from '../index';
import { NodeMenuItemAction } from '../tree/menu/menu.events';
import { MenuItemSelectedEvent } from '../tree/tree.events';
import { NodeType } from '../tree/tree.types';

declare const alertify: any;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  public settings: Ng2TreeSettings = {
    rootIsVisible: true
  };

public ffs: TreeModel = {value: 'שלום, אני בוט לפתרון תקלות במערכת, במה אפשר לעזור?',
    id: 1,
    Nodetype: NodeType.Root,
    children: [],
        settings: {
          isCollapsedOnInit: true,
          leftMenu: true,
          templates: {
            leftMenu: '<i class="fa fa-navicon"></i>',
            leaf: '<i class="fa fa-link"></i>'
          }
        },
};

  private lastFFSNodeId = 1;
  @ViewChild('treeFFS') public treeFFS;

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }

  public ngOnInit(): void {
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
    if(e.node.isNodeCollapsed())
      this.handleActionOnFFS(e.node.id, 'expand');
    else
      this.handleActionOnFFS(e.node.id, 'collapse');

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
  
  public reset()
  {
    const rootId = 1;
    this.renameFFS(rootId,'שלום, אני בוט לפתרון תקלות במערכת, במה אפשר לעזור?');
    this.handleActionOnFFS(rootId, 'collapse');
    this.setChildrenFFS(rootId);
  }

  public renameFFS(id: number | string, newName: string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController) {
      treeController.rename(newName.toString());
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  public setChildrenFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController.setChildren === 'function') {
      treeController.setChildren([
      ]);
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }
  public createBot(event) {
    var string = "";
    string = this.buildTree(this.treeFFS.tree,string);
     alert(string);

  }

  private buildTree(child, string){
   
     if(!child.hasChildren()){
       return string + "<node id='"+child.id+"'>" + child.value+"</node>";
     }

     string += "<node id='"+child.id+"'>" +child.value;
      child.children.forEach((grandChild) => {
        string = this.buildTree(grandChild,string);
      }   );
      
    
    return string + "</node>";
  }
}