import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  type_document: number;
  number_document: number;
  password: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  bussines_name?: string;
  type_identity?: string;
  // // account information
  // language: string;
  // timeZone: string;
  // communication: {
  //   email: boolean,
  //   sms: boolean,
  //   phone: boolean
  // };
  // // email settings
  // emailSettings: {
  //   emailNotification: boolean,
  //   sendCopyToPersonalEmail: boolean,
  //   activityRelatesEmail: {
  //     youHaveNewNotifications: boolean,
  //     youAreSentADirectMessage: boolean,
  //     someoneAddsYouAsAsAConnection: boolean,
  //     uponNewOrder: boolean,
  //     newMembershipApproval: boolean,
  //     memberRegistration: boolean
  //   },
  //   updatesFromKeenthemes: {
  //     newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
  //     tipsOnGettingMoreOutOfKeen: boolean,
  //     thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
  //     newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
  //     tipsOnMetronicBusinessProducts: boolean
  // //   }
  // };

  setUser(user: any) {
    this.id = user.id;
    this.type_document = user.type_document || '';
    this.password = user.password || '';
    this.number_document = user.number_document || '';
    // this.email = user.email || '';
    // this.pic = user.pic || './assets/media/users/default.jpg';
    // this.roles = user.roles || [];
    // this.occupation = user.occupation || '';
    // this.companyName = user.companyName || '';
    // this.phone = user.phone || '';
    // this.address = user.address;
    // this.socialNetworks = user.socialNetworks;
  }
}
