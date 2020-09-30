export class DataConstantsHelper {
    public static adminTabOptions = {
        admin: [
            { id: 1, name: 'Master', isSelected: false, path: '/admin/programs' },
            { id: 2, name: 'Users', isSelected: true, path: '/admin/users' }
        ]
    };
    public static appTabOptions = [
        {
            id: 1,
            name: 'Search',
            path: '/search',
            isSelected: true,
            icon: 'search',
            hasPrintableView: true,
            style: {}
        },
        {
            id: 2,
            name: 'Tools',
            path: '/tools',
            isSelected: false,
            icon: 'build',
            style: {}
        },
        {
            id: 3,
            name: 'Admin',
            path: '/admin',
            isSelected: false,
            icon: 'build',
            style: {}
        }
    ];

    private static tab = DataConstantsHelper.appTabOptions.find(tab => tab.isSelected);

}
