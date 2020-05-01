
export class AppConstantsHelper {
    public static jwtToken = 'jwtToken';
    public static loggedInUser = 'loggedInUser';
    public static tokenLessRelativeUrls = ['jwt/token', 'auth/getUser'];
    public static numberOfReportsPerPanelPage = 4;
    public static userCredentials = {
        isLoggedIn: true,
        userSSO: '123456789',
        userName: 'local',
        userEmail: 'local@nbcuni.com'
    };
    public static userActions = [
        { userAction: 'Login', actionDescription: 'Logged into Chronos App' },
        { userAction: 'Logout', actionDescription: 'Logged out of Chronos App' }
    ];
    public static pavoRoles = [{ roleId: 1, name: 'Admin', isSelected: false },
    { roleId: 2, name: 'User', isSelected: true }];

    public static chronosUserRequiredColumn = { SSO: 'SSO', EMAIL_ID: 'EMAIL_ID', FIRST_NAME: 'FIRST_NAME' };

    public static pavoUserStatus = [{ id: 1, name: 'Active', isSelected: true }, { id: 2, name: 'Inactive', isSelected: false }];

    public static userListHeader = [
        {
            headerName: 'SSO', field: 'UserSSO', sortable: true, filter: true,
            cellClass: 'editable-cell', autoHeight: true,
            cellStyle: { color: '#589ec5', 'white-space': 'normal' }
        },
        {
            headerName: 'Email Id', field: 'UserEmail', sortable: true, filter: true,
            cellRenderer(params) {
                return '<span title="' + params.value + '">' + params.value + '</span>';
            }
        },
        {
            headerName: 'First Name', field: 'FirstName', sortable: true, filter: true,
            cellRenderer(params) {
                return '<span title="' + params.value + '">' + params.value + '</span>';
            }
        },
        {
            headerName: 'Last Name', field: 'LastName', sortable: true, filter: true,
            cellRenderer(params) {
                return '<span title="' + params.value + '">' + params.value + '</span>';
            }
        },
        { headerName: 'Role', field: 'UserRole', sortable: true, filter: true  },
        { headerName: 'Status', field: 'UserStatus', sortable: true, filter: true },
        {
            headerName: 'Categories', field: 'UserCategoriesList', sortable: true, filter: true,  autoHeight: true,
            cellStyle: { 'white-space': 'normal' },

            cellRenderer(params) {
                const a = document.createElement('div');
                if (params.value) {
                    a.innerHTML = params.value;
                    a.innerHTML = a.innerHTML.split(',').join('<br/>');
                }
                return a;
            },

         },
        {
            headerName: 'Modules', field: 'UserModuleList', sortable: true, filter: true,  autoHeight: true,
            cellStyle: { 'white-space': 'normal' },
            cellRenderer(params) {
                const a = document.createElement('div');
                if (params.value) {
                    a.innerHTML = params.value;
                    a.innerHTML = a.innerHTML.split(',').join('<br/>');
                }
                return a;
            },
        },
        { headerName: 'Sub Business', field: 'SubBusinessDesc', sortable: true, filter: true },
        { headerName: 'Cost Centre', field: 'CostCentreDesc', sortable: true, filter: true }
    ];
    public static userauthNull = 'User authentication information is not listed';
    public static userStatus = 'Active';
    public static userRole = 'Admin';
    public static serviceUrl = {
      searchFetchQuestion: 'search/fetchQuestions',
      searchFetchMetadataByQuestionID: 'search/fetchMetadataByQuestionID',
      downloadDashboardReport: 'search/download',
      fetchKPI: 'search/fetchKPI'
    };
    public static insightLabel = 'Insight';
    public static insightByCategoryLabel = [
        {
            labelName: 'Expand All', icon: 'add_circle_outline'
        },
        {
            labelName: 'Collapse All', icon: 'remove_circle_outline'
        },
        {
            parent: 'parent', child: 'child', leaf: 'leaf'
        }
    ];

    public static excelUserListHeader = [
        { header: 'SSO', width:  20 },
        { header: 'Email Id', width:  35 },
        { header: 'First Name', width:  20 },
        { header: 'Last Name', width: 20 },
        { header: 'Role', width: 20 },
        { header: 'Status', width: 20},
        { header: 'Categories', width: 40 },
        { header: 'Modules', width: 40},
        { header: 'SubBusinessID', width: 30 },
        { header: 'CostCentreID', width: 30 }
    ];
    public static excelUserListName = 'User List';
    /*
    public static DeleteUser = {
        title: 'Delete User',
        description: 'To delete the user, click the OK button'
    };
    */
    public static autoSearchBoxLabel = 'Start typing your question';
}
