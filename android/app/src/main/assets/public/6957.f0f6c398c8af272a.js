"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6957],{6957:(O,_,i)=>{i.r(_),i.d(_,{HomePage:()=>h});var c=i(5861),o=i(5548),d=i(8504),g=i(4482),l=i(6814),t=i(6689),m=i(2014);function u(a,s){if(1&a){const n=t.EpF();t.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",8)(3,"ion-button",9),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.closeStackFormModal())}),t._uU(4,"Cancel"),t.qZA()()()(),t.TgZ(5,"ion-content",10)(6,"app-stack-form",11),t.NdJ("submitStack",function(r){t.CHM(n);const P=t.oxw();return t.KtG(P.saveStack(r))}),t.qZA()()}}function f(a,s){if(1&a&&(t.TgZ(0,"ion-card",15)(1,"ion-label",16),t._uU(2),t.qZA()()),2&a){const n=t.oxw().$implicit;t.Q6J("routerLink","/stack-details/"+n.id),t.xp6(2),t.Oqu(n.name)}}function p(a,s){if(1&a&&(t.TgZ(0,"ion-row")(1,"ion-col",13),t.YNc(2,f,3,2,"ion-card",14),t.qZA()()),2&a){const n=s.$implicit;t.xp6(2),t.Q6J("ngIf",n)}}function k(a,s){if(1&a&&(t.TgZ(0,"ion-grid"),t.YNc(1,p,3,1,"ion-row",12),t.qZA()),2&a){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.stacks)}}let h=(()=>{class a{constructor(n){this.leardsStorage=n,this.stacks=[],this.formMode="create"}closeStackFormModal(){this.modal.dismiss(null,"cancel")}getHighestStackId(){return alert("iD: "+JSON.stringify(this.stacks)),console.log(this.stacks.length),0===this.stacks.length?0:this.stacks.reduce((n,e)=>e.id>n.id?e:n).id}saveStacksToStorage(){var n=this;return(0,c.Z)(function*(){yield n.leardsStorage.set("stacks",JSON.stringify(n.stacks))})()}saveStack(n){var e=this;return(0,c.Z)(function*(){n.id=e.getHighestStackId()+1,e.stacks.push(n),yield e.saveStacksToStorage(),yield e.loadStacksFromStorage(),alert("saveStack++++++"+JSON.stringify(e.stacks)),e.closeStackFormModal()})()}loadStacksFromStorage(){var n=this;return(0,c.Z)(function*(){const e=yield n.leardsStorage.get("stacks");null!==e&&(n.stacks=JSON.parse(e)),console.log("stacks: "+n.stacks)})()}ngOnInit(){this.loadStacksFromStorage(),alert("dsfsd"+this.stacks)}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(m.K))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-home"]],viewQuery:function(n,e){if(1&n&&t.Gf(o.ki,5),2&n){let r;t.iGM(r=t.CRH())&&(e.modal=r.first)}},standalone:!0,features:[t.jDz],decls:15,vars:3,consts:[[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","open-modal",1,"ion-float-right"],["name","add"],["trigger","open-modal"],[4,"ngIf"],["slot","start"],[3,"click"],[1,"ion-padding"],[3,"submitStack"],[4,"ngFor","ngForOf"],["size","12"],["class","ion-padding","style","font-size: 1.2rem;",3,"routerLink",4,"ngIf"],[1,"ion-padding",2,"font-size","1.2rem",3,"routerLink"],[1,"ion-text-center"]],template:function(n,e){1&n&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3," Blank "),t.qZA()()(),t.TgZ(4,"ion-content",1)(5,"ion-header",2)(6,"ion-toolbar")(7,"ion-title",3),t._uU(8,"Blank"),t.qZA()()(),t.TgZ(9,"ion-button",4),t._UZ(10,"ion-icon",5),t.qZA(),t.TgZ(11,"ion-modal",6),t.YNc(12,u,7,0,"ng-template"),t.qZA(),t.TgZ(13,"ion-list"),t.YNc(14,k,2,1,"ion-grid",7),t.qZA()()),2&n&&(t.Q6J("translucent",!0),t.xp6(4),t.Q6J("fullscreen",!0),t.xp6(10),t.Q6J("ngIf",e.stacks.length>0))},dependencies:[o.Pc,o.YG,o.Sm,o.PM,o.wI,o.W2,o.jY,o.Gu,o.gu,o.Q$,o.q_,o.Nd,o.wd,o.sr,o.ki,o.YI,d.StackFormPage,g.Bz,g.rH,l.ez,l.sg,l.O5],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]}),a})()}}]);