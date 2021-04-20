/* import */
import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";
import Image from "@/src/components/01_atoms/Image";
import Button from "@/src/components/01_atoms/Button";
import Anchor from "@/src/components/01_atoms/Anchor";
import Layout from "@/src/components/04_templates/Layout";
import { Car, GlobalStoreProvider, process } from "@/types";
import ajax from "@/src/utils/ajax";
import { Store } from "@/src/Store";
/* types */
interface Props {
  className?: string;
  carDetail: Car;
  active: string;
  nextDay: any;
  nowTime: any;
  today: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  const car = props.carDetail;
  return (
    <div className={cn}>
      <h1 className="none">{car.name}の詳細情報ページ</h1>
      <article>
        <h2 className="none">{car.name}のフォトギャラリー</h2>
        <ul className="car-img-list">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((img, key) => (
          <li key={key}><Image alt={`${car.name}のイメージ画像${key}`} src={`${process.env.IMG_PATH}/cars/car_${car.id}_${("00" + img).slice(-2)}.jpg`} width="450px" height="300px" /></li>
        ))}
        </ul>
      </article>
      <article>
        <h2 className="none">{car.name}の詳細情報</h2>
        <p className="car-name">
          {car.name}
        </p>
        <p className="car-price">開始価格 {car.start_price}万円</p>
        <p className="auction-start-time">開催時間: {car.start_time}</p>
        <ul className="detail-btn-group btn-group">
          <li><Button size="medium" color="primary">通知を受け取る</Button></li>
          {/* <li>{props.today == props.nextDay && props.nowTime == car.start_time ? ( */}
          <li>{"2021-01-19" == props.nextDay && "09:00:00" == car.start_time ? (
            <Anchor
              color="secondary"
              size="medium"
              to={`/auction/${car.id}`}
              children="参加する"
              referrer={`/car/${car.id}`}
            />
          ) : (
            <Anchor
              color="disabled"
              size="medium"
              children="参加する"
              referrer={`/car/${car.id}`}
            />
          )}</li>
        </ul>
        <section className="car-description">
          <h3>商品説明</h3>
          <p>{car.description && car.description.split("\n").map((str, key) => (
            <React.Fragment key={key}>{str}<br /></React.Fragment>
          ))}</p>
        </section>
        <section className="car-detail">
          <h3 className="none">{car.name}の詳細情報</h3>
          <ul>
            <li><input type="radio" value="standard" onChange={props.onChange} checked={props.active === "standard"} /><label>基本情報</label></li>
            <li><input type="radio" value="state" onChange={props.onChange} checked={props.active === "state"} /><label>状態</label></li>
            <li><input type="radio" value="option" onChange={props.onChange} checked={props.active === "option"} /><label>オプション</label></li>
          </ul>
          <dl className="standard">
            <div>
              <dt>グレード</dt>
              <dd>{car.grade}</dd>
            </div>
            <div>
              <dt>メーカー</dt>
              <dd>{car.manufacture}</dd>
            </div>
            <div>
              <dt>年式</dt>
              <dd>{car.model_year}</dd>
            </div>
            <div>
              <dt>型式</dt>
              <dd>{car.model_number}</dd>
            </div>
            <div>
              <dt>走行距離</dt>
              <dd>{car.mileage}キロ</dd>
            </div>
            <div>
              <dt>ボディタイプ</dt>
              <dd>{car.body_type}</dd>
            </div>
            <div>
              <dt>ドア数</dt>
              <dd>{car.door_num}</dd>
            </div>
            <div>
              <dt>外装色</dt>
              <dd>{car.color}</dd>
            </div>
            <div>
              <dt>駆動方式</dt>
              <dd>{car.drive_system}</dd>
            </div>
            <div>
              <dt>トランスミッション</dt>
              <dd>{car.transmission}</dd>
            </div>
            <div>
              <dt>排気量</dt>
              <dd>{car.displacement}</dd>
            </div>
            <div>
              <dt>燃料</dt>
              <dd>{car.gas_oil}</dd>
            </div>
            <div>
              <dt>乗車定員</dt>
              <dd>{car.seating_capacity}</dd>
            </div>
          </dl>
          <dl className="state none">
            <div>
              <dt>外装点</dt>
              <dd>{car.ex_point} / 5</dd>
            </div>
            <div>
              <dt>内装点</dt>
              <dd>{car.in_point} / 5</dd>
            </div>
            <div>
              <dt>ワンオーナー</dt>
              <dd>{car.one_owner ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>修理歴</dt>
              <dd>{car.repair_history ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>禁煙車</dt>
              <dd>{car.non_smoking ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>車検</dt>
              <dd>{car.auto_instection}</dd>
            </div>
            <div>
              <dt>認定中古車</dt>
              <dd>{car.certified_used ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>リサイクル委託金</dt>
              <dd>{car.recycling_consignment}</dd>
            </div>
            <div>
              <dt>法定整備</dt>
              <dd>{car.legal_maintenance}</dd>
            </div>
            <div>
              <dt>保障</dt>
              <dd>{car.warranty}</dd>
            </div>
            <div>
              <dt>買取額</dt>
              <dd>{car.purchase_price}万円</dd>
            </div>
          </dl>
          <dl className="option none">
            <div>
              <dt>パワーステアリング</dt>
              <dd>{car.pw_steering ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>パワーウィンドウ</dt>
              <dd>{car.pw_window ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>エアコン</dt>
              <dd>{car.aircon ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>Wエアコン</dt>
              <dd>{car.w_aircon ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>キーレス</dt>
              <dd>{car.keyless ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>スマートキー</dt>
              <dd>{car.smart_key ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>カーナビ</dt>
              <dd>{car.car_navigation ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>TV</dt>
              <dd>{car.tv}</dd>
            </div>
            <div>
              <dt>オーディオ</dt>
              <dd>{car.audio}</dd>
            </div>
            <div>
              <dt>ビジュアル</dt>
              <dd>{car.visual}</dd>
            </div>
            <div>
              <dt>Bluetooth</dt>
              <dd>{car.bluetooth ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>USB</dt>
              <dd>{car.usb ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>100V</dt>
              <dd>{car.pw_supply ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>バックカメラ</dt>
              <dd>{car.back_camera ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>全周囲カメラ</dt>
              <dd>{car.around_camera ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>ETC</dt>
              <dd>{car.etc ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>3列シート</dt>
              <dd>{car.third_seat ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>電動シート</dt>
              <dd>{car.ele_seat ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>シートヒーター</dt>
              <dd>{car.seat_heater ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>シートエアコン</dt>
              <dd>{car.seat_aircon ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>本革シート</dt>
              <dd>{car.leather_seat ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>スライドドア</dt>
              <dd>{car.slide_door ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>電動リアゲート</dt>
              <dd>{car.ele_gate ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>ウォークスルー</dt>
              <dd>{car.walk_through ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>クルコン</dt>
              <dd>{car.cruise_control ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>レーンアシスト</dt>
              <dd>{car.lane_assist ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>障害物センサー</dt>
              <dd>{car.obstacle_sensor ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>自動駐車</dt>
              <dd>{car.auto_parking ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>パーキングアシスト</dt>
              <dd>{car.parking_assist ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>ABS</dt>
              <dd>{car.abs ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>横滑り防止</dt>
              <dd>{car.stability_control ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>衝突被害軽減ブレーキ</dt>
              <dd>{car.mitigation_brake ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>ヘッドライト</dt>
              <dd>{car.head_light}</dd>
            </div>
            <div>
              <dt>サンルーフ</dt>
              <dd>{car.sun_roof ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>エアロ</dt>
              <dd>{car.aero ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>アルミホイール</dt>
              <dd>{car.al_wheel ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>ローダウン</dt>
              <dd>{car.low_down ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>リフトアップ</dt>
              <dd>{car.lift_up ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>スーパーチャージャー</dt>
              <dd>{car.super_charger ? "○" : "×"}</dd>
            </div>
            <div>
              <dt>エアサスペンション</dt>
              <dd>{car.air_suspension ? "○" : "×"}</dd>
            </div>
          </dl>
        </section>
      </article>
    </div>
  );
};
/* styled */
const StyledComponent = styled(Component)<Props>`
  display: flex;
  margin-top: 20px;
  article {
    /* border: solid grey 1px; */
  }
  article:nth-of-type(1) {
    width: 60%;
    margin-bottom: 20px;
    ul {
      width: 100%;
      display: flex;
      flex-flow: wrap row;
      li {
        width: 50%;
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
  article:nth-of-type(2) {
    width:40%;
    .car-price, .auction-start-time {
      text-align: center;
      line-height: 1.8rem;
    }
    .car-name {
      text-align: center;
      font-size: 1.6rem;
      line-height: 2.5rem;
      margin-bottom: 20px;
    }
    .car-description {
      text-align: left;
      width: 95%;
      margin: 20px auto;
      h3 {
        background-color: #E16B6B;
        color: white;
        padding: 10px 5px;
        margin-bottom: 10px;
      }
    }
    .car-detail {
      width: 95%;
      margin: auto;
      ul {
        display: flex;
        margin-bottom: 20px;
        li {
          width: 33.3%;
          text-align: center;
          background-color: #E16B6B;
          color: white;
          position: relative;
          padding: 10px 5px;
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          label {
            position: absolute;
            top: 0;left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            transition: 0.5s;
          }
          input[type=radio]:hover + label {
            color: #bababa;
          }
          input[type=radio]:checked  + label {
            background-color: #f3abab;
          }
        }
      }
      dl {
        margin-bottom: 20px;
        div {
          display: flex;
          width: 100%;
          dt, dd {
            width: 50%;
            text-align: center;
            border: solid #C0C0C0 1px;
            border-collapse: collapse;
            padding: 10px 5px;
          }
          dt {
            background-color: #d5d5d5;
          }
        }
      }
    }
    .detail-btn-group {
      width: 95%;
      display: flex;
      justify-content: space-evenly;
      margin: auto;
      margin-top: 20px;
    }
  }

`;
/* Container */
const CarDetail: React.FC<RouteComponentProps<{carId: string}>> = (props): JSX.Element => {
  const { state, dispatch }: GlobalStoreProvider = React.useContext(Store);
  const [car, setCar] = React.useState<any>("");
  const [active, setActive] = React.useState<string>("standard");

  console.log(car);
  React.useEffect(() => {
    ajax({method: "GET", url: `/cars/${props.match.params.carId}`})
    ?.then(res => setCar(res.data))
    ?.catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.getElementsByClassName(active)[0].classList.add("none");
    setActive(e.target.value);
    document.getElementsByClassName(e.target.value)[0].classList.remove("none");
  };

  return (
    <Layout>
      <StyledComponent
        carDetail={car}
        onChange={handleChange}
        active={active}
        nextDay={state.nextAuctionDay}
        nowTime={state.nowTime}
        today={state.today}
      />
    </Layout>
  );
};

export default CarDetail;
