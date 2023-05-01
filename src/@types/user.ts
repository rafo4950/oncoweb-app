import { z } from "zod";
import { DocumentSchema, DocumentTimestampSchema } from "./base";
import { notEmptyStr, notEmptyStrOptional } from "./utils";

// ----------------------------------------------------------------------

/*
 * User
 */

export const userEditableAttributesSchema = z.object({
  fullName: notEmptyStr,
  phone: notEmptyStrOptional,
  avatar: notEmptyStrOptional,
  disabled: z.boolean().default(false),
})

export type UserEditableAttributes = z.infer<typeof userEditableAttributesSchema>;

export const requiredUserAttributesSchema = z.object({
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
});

export type RequiredUserAttributes = z.infer<typeof requiredUserAttributesSchema>;

export const userAtributesSchema = userEditableAttributesSchema.extend(requiredUserAttributesSchema.shape);

export type UserAtributes = z.infer<typeof userAtributesSchema>;

// ----------------------------------------------------------------------

export type User = UserAtributes;

export const userDocumentSchema = userAtributesSchema.extend({ ...DocumentSchema.shape, ...DocumentTimestampSchema.shape });

export type UserDocument = z.infer<typeof userDocumentSchema>;

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export type UserInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserManager = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type NotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export type Friend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type UserPost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};
