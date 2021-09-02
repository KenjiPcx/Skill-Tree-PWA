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