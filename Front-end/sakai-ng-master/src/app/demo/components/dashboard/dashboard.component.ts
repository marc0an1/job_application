import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    filterOptions: any[] = [{ label: 'All', value: null }];
    selectedFilter: any;
    expandedSection: string | null = null;

    defaultStyle = `
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        width: 100%;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    expandedStyle = `
        border: 1px solid #ccc;
        padding: 40px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 30px);
        width: calc(100vw - 30px);
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #fff;
        z-index: 1000;
        cursor: auto;
        transition: all 0.3s ease;
    `;

    toggleExpand(section: string) {
        if (this.expandedSection === section) {
            this.expandedSection = null;
        } else {
            this.expandedSection = section;
        }
    }

    minimizeSection(event: Event) {
        event.stopPropagation(); // Prevent the click from triggering toggleExpand
        this.expandedSection = null;
    }
}
