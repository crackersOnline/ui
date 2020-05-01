import { environment } from '../environments/environment';

export class AppSettings {
    public static microservices = AppSettings.getMicroServiceUrlsAsPerEnvironment();
    // public static snapStreamProperties = environment.snapStreamProperties;
    private static getMicroServiceUrlsAsPerEnvironment() {
        const microservices = {
            UserMgmt_MicroService_BaseUrl:
                environment.envName === 'local' ? environment.userMgmtBaseUrl :
                    environment.apiBaseUrl,
            search_MicroService_BaseUrl:
                    environment.envName === 'local' ? environment.searchBaseUrl : environment.apiBaseUrl
        };
        return microservices;
    }

}
