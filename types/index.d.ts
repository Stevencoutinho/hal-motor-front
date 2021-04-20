/* ユーザー情報 */
export declare interface User {
  id: number;
  name?: string;
}
/* 車情報 */
export declare interface Car {
  /**
   * 車両ID
   */
  id?: number;
  /**
   * 車両名
   */
  name?: string;
  /**
   * グレード
   */
  grade?: string;
  /**
   * メーカー
   */
  manufacture?: string;
  /**
   * 年式
   */
  model_year?: string;
  /**
   * 型式
   */
  model_number?: string;
  /**
   * ボディタイプ
   */
  body_type?: string;
  /**
   * ドア数
   */
  door_num?: number;
  /**
   * 外装色
   */
  color?: string;
  /**
   * 駆動方式
   */
  drive_system?: string;
  /**
   * ミッション
   */
  transmission?: string;
  /**
   * 排気量
   */
  displacement?: number;
  /**
   * 燃料
   */
  gas_oil?: string;
  /**
   * 定員
   */
  seating_capacity?: number;
  /**
   * 外装点
   */
  ex_point?: number;
  /**
   * 内装点
   */
  in_point?: number;
  /**
   * 走行距離
   */
  mileage?: number;
  /**
   * ワンオーナー
   */
  one_owner?: number;
  /**
   * 修理歴
   */
  repair_history?: string;
  /**
   * 禁煙車
   */
  non_smoking?: number;
  /**
   * 車検
   */
  auto_instection?: string;
  /**
   * 認定中古車
   */
  certified_used?: number;
  /**
   * リサイクル委託金
   */
  recycling_consignment?: string;
  /**
   * 法廷整備
   */
  legal_maintenance?: string;
  /**
   * 保証
   */
  warranty?: string;
  /**
   * 買取額
   */
  purchase_price?: number;
  /**
   * 車両説明
   */
  description?: string;
  /**
   * パワーステアリング
   */
  pw_steering?: number;
  /**
   * パワーウィンドウ
   */
  pw_window?: number;
  /**
   * エアコン
   */
  aircon?: number;
  /**
   * wエアコン
   */
  w_aircon?: number;
  /**
   * キーレス
   */
  keyless?: number;
  /**
   * スマートキー
   */
  smart_key?: number;
  /**
   * カーナビ
   */
  car_navigation?: number;
  /**
   * TV
   */
  tv?: string;
  /**
   * オーディオ
   */
  audio?: string;
  /**
   * ビジュアル
   */
  visual?: string;
  /**
   * Bluetooth
   */
  bluetooth?: number;
  /**
   * USB
   */
  usb?: number;
  /**
   * 100v
   */
  pw_supply?: number;
  /**
   * バックカメラ
   */
  back_camera?: number;
  /**
   * 全周囲カメラ
   */
  around_camera?: number;
  /**
   * ETC
   */
  etc?: number;
  /**
   * 3列シート
   */
  third_seat?: number;
  /**
   * 電動シート
   */
  ele_seat?: number;
  /**
   * シートヒーター
   */
  seat_heater?: number;
  /**
   * シートエアコン
   */
  seat_aircon?: number;
  /**
   * 本革シート
   */
  leather_seat?: number;
  /**
   * スライドドア
   */
  slide_door?: number;
  /**
   * 電動リアゲート
   */
  ele_gate?: number;
  /**
   * ウォークスルー
   */
  walk_through?: number;
  /**
   * クルコン
   */
  cruise_control?: number;
  /**
   * レーンアシスト
   */
  lane_assist?: number;
  /**
   * 障害物センサー
   */
  obstacle_sensor?: number;
  /**
   * 自動駐車
   */
  auto_parking?: number;
  /**
   * パーキングアシスト
   */
  parking_assist?: number;
  /**
   * ABS
   */
  abs?: number;
  /**
   * 横滑り防止
   */
  stability_control?: number;
  /**
   * 衝突被害軽減ブレーキ
   */
  mitigation_brake?: number;
  /**
   * ヘッドライト
   */
  head_light?: string;
  /**
   * サンルーフ
   */
  sun_roof?: number;
  /**
   * エアロ
   */
  aero?: number;
  /**
   * アルミホイール
   */
  al_wheel?: number;
  /**
   * ローダウン
   */
  low_down?: number;
  /**
   * リフトアップ
   */
  lift_up?: number;
  /**
   * スーパーチャージャー
   */
  super_charger?: number;
  /**
   * エアサスペンション
   */
  air_suspension?: number;
  /**
   * 開始価格
   */
  start_price?: number;
  /**
   * 開始時間
   */
  start_time?: string;
  /**
   * 画像枚数
   */
  image_num?: number;
};
/* store */
export declare interface GlobalState {
  user: User;
  today: string;
  nowTime: string;
  nextAuctionDay: string;
  cars: any;
}
/* login */
declare interface LoginAction {
  type: "LOGIN";
  payload: User;
}
declare interface DaySetAction {
  type: "DAYSET";
  payload: string;
}
declare interface CarAction {
  type: "CAR";
  payload: Car[]
}
export type Actions =
  | LoginAction
  | DaySetAction
  | CarAction;

export declare interface process {
  env: {
    IMG_PATH: string;
    API_PATH: string;
  }
}

export declare interface GlobalStoreProvider {
  state: GlobalState;
  dispatch: React.Dispatch<Actions>;
}