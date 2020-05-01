import { UsageTrackingActionDescription } from '../models/app.enums';
export class UsageTrackingModel {
    public SSO = null;
    public action = null;
    public actionDescription = null;
    public questionID = null;
    public catgID = null;
    public subCatgID = null;
    public dashboardReportID = null;
    public platform = null;
    constructor(action, questionId, catgId, subCatgID, dashboardReportID) {
        const userDetails = localStorage.getItem('currentUser');
        if (userDetails) {
            this.SSO = JSON.parse(userDetails).userSSO;
        }
        this.action = action;
        this.actionDescription = UsageTrackingActionDescription[action];
        this.questionID = questionId;
        this.catgID = catgId;
        this.subCatgID = subCatgID;
        this.dashboardReportID = dashboardReportID;
    }
}

