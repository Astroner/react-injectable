import { Injectable, OnInit } from "../../src";

export class TitleService extends Injectable implements OnInit {

    private title: HTMLTitleElement;

    getDefaultState(): void {
        
    }
    
    onInit(){
        this.title = document.querySelector("title") ?? document.head.appendChild(document.createElement("title"));
    }

    setTitle(title: string){
        this.title.innerHTML = title
    }

}