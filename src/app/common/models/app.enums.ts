export enum LogType {
    Error = 'Error',
    Warn = 'Warn',
    Info = 'Info'
}
export enum ReportTypeEnum {
    Tableau = 'Tableau',
    Pdf = 'Pdf',
    Excel = 'Excel',
    Ppt = 'Ppt'
}
export enum UsageTrackingActionType {
    Login = 'Login',
    KPIDashboard = 'KPIDashboard',
    AllDashboards = 'AllDashboards',
    SearchQuestion = 'SearchQuestion',
    ReportLinkClick = 'ReportLinkClick',
    LogOff = 'LogOff'
}

export enum UsageTrackingActionDescription {
    Login = 'Login to the application',
    KPIDashboard = 'KPI dashboard load',
    AllDashboards = 'Navigate all dashboards',
    SearchQuestion = 'Search question',
    ReportLinkClick = 'Clicked on report link',
    LogOff = 'Log off from the application'
}

export enum DeviceType {
    phone = 'phone',
    tablet = 'tablet',
    desktop = 'desktop'
}

export enum DownloadTypeEnum {
    Csv = 'csv',
    Excel = 'excel'
}
