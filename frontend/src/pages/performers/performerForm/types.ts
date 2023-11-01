import {
  GenderEnum,
  HairColorEnum,
  EyeColorEnum,
  EthnicityEnum,
  BreastTypeEnum,
} from "src/graphql";

export type InitialPerformer = {
  name?: string | null;
  disambiguation?: string | null;
  gender?: GenderEnum | null;
  birthdate?: string | null;
  height?: number | null;
  hair_color?: HairColorEnum | null;
  eye_color?: EyeColorEnum | null;
  ethnicity?: EthnicityEnum | null;
  breast_type?: BreastTypeEnum | null;
  country?: string | null;
  career_start_year?: number | null;
  career_end_year?: number | null;
  urls?: {
    url: string;
    site: {
      id: string;
      name: string;
    };
  }[];
  aliases?: string[];
  waist_size_us?: number | null;
  hip_size_us?: number | null;
  band_size_us?: number | null;
  cup_size_us?: string | null;
  waist_size_jp?: number | null;
  hip_size_jp?: number | null;
  band_size_jp?: number | null;
  cup_size_jp?: string | null;
  images?: {
    id: string;
    url: string;
    width: number;
    height: number;
  }[];
  tattoos?: {
    location: string;
    description?: string | null;
  }[];
  piercings?: {
    location: string;
    description?: string | null;
  }[];
};
