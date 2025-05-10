import { ReactElement } from "react";

export type ItemRouteType = {
  key: string;
  components: ReactElement;
  layout: string;
  private: boolean;
  children?: ItemRouteType[]; 
}