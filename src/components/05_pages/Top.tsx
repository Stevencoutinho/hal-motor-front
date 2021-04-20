/*========== import ==========*/
import React from "react";
import styled from "styled-components";
import Button from "@/src/components/01_atoms/Button";
import SelectBox from "@/src/components/01_atoms/SelectBox";
import Image from "@/src/components/01_atoms/Image";
import Anchor from "@/src/components/01_atoms/Anchor";
import Layout from "@/src/components/04_templates/Layout";
import { GlobalStoreProvider, process, Car } from "@/types";
import { Store } from "@/src/Store";
import { Link } from "react-router-dom";
import ajax from "@/src/utils/ajax";
import { SettingsSystemDaydream } from "@material-ui/icons";
/* type */
interface Props {
  className?: string;
  nextDay: string;
  cars: any;
  nowTime: any;
  today: any;
};
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;

  return (
    <div className={cn}>
      <h1 className="none">HAL MOTORのtop画面</h1>
      <p className="next-day"><span>次のオークション開催日は</span><br />
        {props.nextDay}
      </p>
      <article className="car-search">
        <h2>車を探す</h2>
        <dl>
          <dt>メーカー名</dt>
          <dd><SelectBox
            options={[
              {label: "1", value: "1"},
              {label: "2", value: "2"},
              {label: "10", value: "10"},
            ]}
          /></dd>
          <dt>車種名</dt>
          <dd><SelectBox
            options={[
              {label: "1", value: "1"},
              {label: "2", value: "2"},
              {label: "10", value: "10"},
            ]}
          /></dd>
          <dt>年式</dt>
          <dd><SelectBox
            options={[
              {label: "1", value: "1"},
              {label: "2", value: "2"},
              {label: "10", value: "10"},
            ]}
          /></dd>
        </dl>
        <p><Button color="halmotor" size="medium" children="検索する" /></p>
      </article>
      <article className="cars">
        <h2 className="none">開催予定の車両一覧</h2>
        {props.cars && props.cars.map((car: any, key: any) => (
          <section key={key} className="car">
            <div className="car-card">
              <Link to={`/car/${car.id}`}>
                <h3 className="none">{car.name}のイメージ画像と簡単な説明</h3>
                <p><Image
                  className="car-image"
                  alt={`${car.name}のイメージ`}
                  src={`${process.env.IMG_PATH}/cars/car_${car.id}_01.jpg`}
                  width="450px"
                  height="300px"
                /></p>
                <div className="car-description">
                  <div className="car-name">
                    <p>{car.name}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>年式</dt>
                      <dd>{car.model_year}</dd>
                    </div>
                    <div>
                      <dt>走行距離</dt>
                      <dd>{car.mileage}キロ</dd>
                    </div>
                    <div>
                      <dt>開始価格</dt>
                      <dd>{car.start_price}万円</dd>
                    </div>
                    <div>
                      <dt>開始時間</dt>
                      <dd>{car.start_time}</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </div>
              <ul className="btn-group">
                <li><Button size="medium" color="primary" value={car.id}>通知を受け取る</Button></li>
                {/* <li>{props.today == props.nextDay && props.nowTime == car.start_time ? ( */}
                <li>{"2021-01-19" == props.nextDay && "09:00:00" == car.start_time ? (
                  <Anchor
                    color="secondary"
                    size="medium"
                    to={`/auction/${car.id}`}
                    children="参加する"
                  />
                ) : (
                  <Anchor
                    color="disabled"
                    size="medium"
                    children="参加する"
                  />
                )}
              </li>
            </ul>
          </section>
        ))}
      </article>
    </div>
  );
};
/* style */
const StyledComponent = styled(Component)<Props>`
  margin-top: 20px;
  .next-day {
    text-align: center;
    font-size: 2rem;
    line-height: 2.2rem;
    margin-bottom:20px;
    span {
      font-size: 1rem;
    }
  }
  .car-search {
    width: 40%;
    border: solid #C0C0C0 1.5px;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 50px;
    h2 {
      text-align: center;
      font-size: 1.6rem;
      margin: 10px 0;
    }
    dl {
      width:95%;
      padding: 5px;
      margin: auto;
      margin-bottom: 10px;
      dt, dd, dd option {
        font-size: 1rem;
        margin-bottom: 10px;
      }
      dt {
        font-weight: normal;
      }
      dd select {
        width: 100%;
        border-radius: 5px;
        padding: 10px;
        background-image: url("${process.env.IMG_PATH}/utils/selectBtn.png");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 20px 20px;
        cursor: pointer;
      }
    }
    p {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .cars {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-flow: wrap row;
    &:after {
      content: "";
      display: block;
      width: 33.3%;
      height: 0;
    }
  }
  .car {
    width: 33.3%;
    max-width: 460px;
    margin-bottom: 20px;
    text-align: center;
    .car-card {
      transition: 0.5s;
      &:hover {
        color: #a7a7a7;
      }
    }
    .car-image {
      margin-bottom: 10px;
    }
    .car-description {
      width: 450px;
      margin: auto;
      margin-bottom: 20px;
      .car-name {
        text-align: left;
        display: flex;
        margin-bottom: 5px;
        p {
          font-size: 1.2rem;
        }
      }
      .car-name p:nth-child(1) {
        margin-right: 20px;
      }
      dl div {
        display: flex;
        border-bottom: solid #C0C0C0 1px;
        padding: 10px 0;
        dt, dd {
          font-size: 1rem;
        }
        dt {
          min-width: 70px;
          text-align: left;
          margin-right: 40px;
        }
      }
    }
    .btn-group {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
`;
/* container */
const Top: React.FC = (): JSX.Element => {
  const {state, dispatch}: GlobalStoreProvider = React.useContext(Store);
  const [cars, setCar] = React.useState<any>("");

  React.useEffect(() => {
    ajax({method: "GET", url:"/top"})
    ?.then((res: any) => {
      console.log(res.data[0]);
      setCar(res.data[0].Cars);
      dispatch({type: "DAYSET", payload: res.data[0].start_day});
      // dispatch({type: "CAR", payload: res.data[0].Cars});
    })
    ?.catch(err => console.log("API connect err"));
  }, []);

  return (
    <Layout>
      <StyledComponent
        nextDay={state.nextAuctionDay}
        cars={cars}
        today={state.today}
        nowTime={state.nowTime}
      />
    </Layout>
  );
};

/* export */
export default Top;