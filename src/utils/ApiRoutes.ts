export class ApiRoutes {
  public static HOST = "http://localhost:5000";
  public static registerRoute = `${this.HOST}/api/auth/register`;
  public static loginRoute = `${this.HOST}/api/auth/login`;
  public static getRandomAvatar = `https://api.multiavatar.com/45678945`;
  public static refreshToken = `${this.HOST}/api/auth/refreshToken`;
}
