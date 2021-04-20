import React from "react";
import styled from "styled-components";
import Image from "@/src/components/01_atoms/Image";
import Button from "@/src/components/01_atoms/Button";
import Layout from "@/src/components/04_templates/Layout";
import SelectBox from "@/src/components/01_atoms/SelectBox";
import ajax from "@/src/utils/ajax";
import toHms from "@/src/utils/toHms";
import dateToStr from "@/src/utils/dateToStr";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Store } from "@/src/Store";
import { GlobalStoreProvider, process } from "@/types";
/* types */
interface Props {
  className?: string;
  car: any;
  nowPrice: number;
  remainingTime: any;
  active: string;
  auctionHistory: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRemove: any;
  onClickActive: any;
  onSubmit: any;
}
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  const car = props.car;

  return (
    <div className={cn}>
      <div id="log"></div>
      <div className="blanding-image">
        <Image alt={`${car.name}のイメージ画像`} src={`${process.env.IMG_PATH}/cars/car_${car.id}_01.jpg`} />
      </div>
      <h1 className="none">{car.name}のオークション開催画面</h1>
      <p className="auction-car-name">{car.name}</p>
      <div className="auction-operation">
        <ul className="price-time">
          <li className="now-price">現在価格： <span className={props.remainingTime ? "" : "red-time"}>{
            String(Math.floor(props.nowPrice * 10) / 10)
          }万円</span></li>
          {props.remainingTime ? (
            <li>残り時間： <span className={props.remainingTime < 60 ? "red-time" : ""}>{toHms(props.remainingTime)}</span></li>
          ) : (
            <li>終了</li>
          )}
          {/* <li>残り時間： <span className={props.remainingTime < 60 ? "red-time" : ""}>{toHms(props.remainingTime)}</span></li> */}
        </ul>
        {props.remainingTime ? (
          <ul>
            <li><Button color="secondary" size="medium">退出する</Button></li>
            <li><Button color="primary" size="medium" value="offer" onClick={props.onClickRemove}>入札する</Button></li>
          </ul>
        ) : <p><Button color="secondary" size="medium">結果画面へ</Button></p>}
      </div>
      <article className="auction-history">
        <h2>最近のオファー履歴</h2>
        <dl className="auction-history-data">
        {props.auctionHistory && props.auctionHistory.map((data: any, key: any) => (
          <div key={key}>
            <dt>{data.bid_time}</dt>
            <dd>{Math.floor(data.price * 10) / 10}万円</dd>
          </div>
        ))}
        </dl>
      </article>
      <article className="auction-car-detail">
        <h2 className="none">{car.name}の詳細情報</h2>
        <section className="car-description">
          <h3>商品説明</h3>
          <p>{car.description && car.description.split("\n").map((str:any, key:any) => (
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
      <article className="offer none">
        <h2 className="none">オファー画面</h2>
        <div className="click-area" onClick={props.onClickActive}>
          <p className="close-btn" onClick={props.onClickActive}><Image alt="閉じる" src={`${process.env.IMG_PATH}/utils/close.png`} width="50px" /></p>
        </div>
        <section>
          <form onSubmit={props.onSubmit}>
            <p><input type="number" min="0" max="100" defaultValue="0" name="thousand" required/> 万 <input type="number" min="0" max="9000" step="1000" name="yen" defaultValue="1000" required/> 円</p>
            <p><Button color="halmotor" size="medium">送信</Button></p>
          </form>
        </section>
      </article>
    </div>
  );
};
/* styled */
const StyledComponent = styled(Component)<Props>`
  .blanding-image {
    width: 100%;
    text-align: center;
    background-color: #bababa;
    margin-bottom: 20px;
    img {
      width: 50%;
      margin: auto;
    }
  }
  .auction-car-name {
    font-size: 2rem;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .auction-operation {
    width: 100%;
    text-align: center;
    /* position: sticky;
    top: 10%; */
    ul {
      display: flex;
      justify-content: center;
      li {
        margin: 0 10px;
      }
    }
    .price-time {
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
    .red-time {
      color: red;
    }
  }
  article {
    width: 60%;
    margin: auto;
  }
  .auction-history {
    width: 60%;
    border: solid #DADADA 1px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    h2 {
      font-size: 1.4rem;
      border-bottom: solid #DADADA 1px;
      padding: 10px;
    }
    dl {
      height: 25vh;
      overflow-y: scroll;
    }
    dl div {
      display: flex;
      justify-content: space-between;
      border-bottom: solid #DADADA 1px;
      padding: 10px;
    }
    dd {
      font-size: 1rem;
    }
  }
  .auction-car-detail {
    .car-description {
      margin-bottom: 20px;
      h3 {
        background-color: #E16B6B;
        color: white;
        padding: 10px 5px;
        margin-bottom: 10px;
      }
      p {
        line-height: 1.4rem;
      }
    }
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
  .offer {
    width: 100%;
    height: 100vh;
    position: fixed;
    top:0;
    z-index: 11;
    background-color: rgba(23, 23, 23, 0.748);
    .click-area {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
    }
    .close-btn {
      position: absolute;
      top: 50px;
      right: 20px;
      cursor: pointer;
    }
    section {
      width: 65%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
      h3 {
        font-size: 2rem;

      }
      form {
        position: relative;
        z-index: 20;
        background-color: white;
        font-size: 1.6rem;
        padding: 50px;
      }
      p {
        text-align: center;
        margin-bottom: 20px;
      }
    }
    input {
      border: solid black 1px;
    }
  }
`;
/* container */
const Auction: React.FC<RouteComponentProps<{carId: string}>> = (props): JSX.Element => {
  const { state, dispatch }: GlobalStoreProvider = React.useContext(Store);
  const [car, setCar] = React.useState<any>("");
  const [socket, setSocket] = React.useState<any>(new WebSocket(`ws://18.176.57.152:3000/auctions/${props.match.params.carId}/car`));
  const [nowPrice, setNowPrice] = React.useState<number>(0);
  const [remainingTime, setRemainingTime] = React.useState<any>(600);
  const [history, setHistory] = React.useState<any>("");
  const [active, setActive] = React.useState<string>("standard");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.getElementsByClassName(active)[0].classList.add("none");
    setActive(e.target.value);
    document.getElementsByClassName(e.target.value)[0].classList.remove("none");
  };

  const handleClickRemove = (e: any) => {
    document.getElementsByClassName(e.target.value)[0].classList.remove("none");
  };
  const handleClickActive = () => {
    document.getElementsByClassName("offer")[0].classList.add("none");
  }

  React.useEffect(() => {
    if(remainingTime) {
      const intervalId = setInterval(() => {
        const time = remainingTime * 1000;
        const sec = time - 1000;
        setRemainingTime(sec / 1000);
      }, 1000);
      return () => {clearInterval(intervalId)};
    }
  }, [remainingTime]);

  // let socket: any = new WebSocket(`ws://18.176.57.152:3000/auctions/${props.match.params.carId}/car`);
  socket.onopen = () => console.log("socket connected");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const price = Number(`${e.target.thousand.value}.${e.target.yen.value}`);
    const now = dateToStr(new Date(), "YYYY-MM-DD hh:mm:ss").split(' ')[1];

    socket.send(JSON.stringify({
      auction_id: 1,
      user_id: state.user.id,
      car_id: Number(props.match.params.carId),
      price: nowPrice + Math.floor(price * 10) / 10,
      bid_time: now,
    }));

    document.getElementsByClassName("offer")[0].classList.add("none");
  };

  let href = location.href;
  let observer = new MutationObserver((mutations) => {
    if(href !== location.href) {
      socket.close();
      href = location.href;
    }
  });

  observer.observe(document, { childList: true, subtree: true });

  socket.onmessage = (e: any) => {
    const data = JSON.parse(e.data);
    console.log(data);
    // setHistory(history.push(data));
    const ary = history;
    ary.push(data);
    setNowPrice(data.price);
    setHistory(ary);
  };

  React.useEffect(() => {
    if(state.user.id) {
      ajax({method: "GET", url: `/cars/${props.match.params.carId}`})
      ?.then((res: any) => {
        let now: any = dateToStr(new Date(), "YYYY-MM-DD hh:mm:ss").split(' ')[1];
        now = now.split(":");
        now = `${now[1]}${now[2]}`;
  
        let start_time: any = res.data.start_time.split(":");
        start_time = `${start_time[1]}${start_time[2]}`;
  
        let num: any = String(Number(now) - 1000);//　発表の時はここを最短で終わるようにする
        // let num: any = String(Number(now) - Number(start_time));

        let sec = num.substr(1, 3);
        let min = num.substr(0, 1);
  
        const result = Number(min) * 60 + Number(sec);

        setRemainingTime(600 - result);
  
        setCar(res.data);
        if(nowPrice) {
          setNowPrice(res.data.start_price);
        }
      })
      .catch(err => console.error(err));
      ajax({method: "GET", url: `/bids/car/${props.match.params.carId}`})
      ?.then((res: any) => {
        console.log(res.data);
        if(res.data) {
          const prices = res.data.map((price: any) => price.price);
          const max = Math.max.apply(null, prices);
          setNowPrice(max);
        }
        setHistory(res.data);
      })
      .catch(err => console.error(err));
    }
  }, []);

  return (
    <>
      {state.user.id ? (
        <>
          {remainingTime ? (
            <Layout>
              <StyledComponent
                car={car}
                nowPrice={nowPrice}
                remainingTime={remainingTime}
                onChange={handleChange}
                onClickRemove={handleClickRemove}
                onClickActive={handleClickActive}
                active={active}
                auctionHistory={history}
                onSubmit={handleSubmit}
              />
            </Layout>
          ) : (
            <Redirect to={`/result/${props.match.params.carId}`} />
          )}
        </>
      ):(
        <Redirect to="/login" />
      )}
    </>
  );
};
export default Auction;