import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})
export class SideNavService {

    /**
     * Toggle Event
     */
    public SideNavToggleChanged: Subject<boolean>;

    /**
     * Boolean to open/close sidenav
     */
    public SideNavToggleVal: boolean;

    constructor() {
        this.SideNavToggleChanged = new Subject();
        this.SideNavToggleVal = true;
    }

    /**
     * Open/Close sidenav
     */
    public SideNavToggle(): void {
        const toggle: boolean = this.SideNavToggleVal = !this.SideNavToggleVal;
        this.SideNavToggleChanged.next(toggle);
    }

}