export class UserMetadata {
    public USER_ID: string;
    public SSO: string;
    public EMAIL_ID: string;
    public FIRST_NAME: string;
    public MIDDLE_NAME: string;
    public LAST_NAME: string;
    public ROLE_ID: number;
    public STATUS: string;
    public CREATED_BY: string;
    public MODIFIED_BY: string;

    constructor(userId, sso, emailId, firstName, middleName, lastName, roleId, status, createdBy, modifiedBy) {
        this.USER_ID = userId;
        this.SSO = sso;
        this.EMAIL_ID = emailId;
        this.FIRST_NAME = firstName;
        this.MIDDLE_NAME = middleName;
        this.LAST_NAME = lastName;
        this.ROLE_ID = roleId;
        this.STATUS = status;
        this.CREATED_BY = createdBy;
        this.MODIFIED_BY = modifiedBy;
    }
}
