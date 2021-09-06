export interface ModalData {
  selectedNode: string;
  modalType: string;
  openModal: boolean;
  showSpeedDial: boolean;
}

export interface GraphData {
  graph: any;
  graphName:
    | "Knowledge Network"
    | "Learning List"
    | "Learning Stats"
    | "Timeline"
    | "App Info";
  focusedNode: string;
}

export interface ErrorData {
  errorMsg: string;
  showError: boolean;
}

export interface ScreenData {
  width: number;
  height: number;
  orientation: string;
}

export type Skill = {
  learning?: boolean;
  id?: string;
  name: string;
  parent?: string;
  group: string;
  usedFrequency: number;
  imageURL?: string;
  yearStarted?: string;
};

export type RelaxedSkill = {
  learning?: boolean;
  id?: string;
  name: string;
  parent?: string;
  group: string;
  usedFrequency?: number;
  imageURL?: string;
  yearStarted?: string;
};

export type NodeInfo = {
  color: string;
  colorType:
    | "error"
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "secondary"
    | undefined;
  level: string;
  rating: number;
  msg: string;
  msg2: string;
  starting: number;
  nextLvlReq: number;
};

export type InfoNode = {
  learning?: boolean;
  id?: string;
  name: string;
  parent?: string;
  group: string;
  usedFrequency?: number;
  imageURL?: string;
};

export interface FieldData {
  usedFrequency: number;
  favourites: string[];
}