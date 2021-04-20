import React from "react";
import styled from "styled-components";
import Image from "@/src/components/01_atoms/Image";
import Anchor from "@/src/components/01_atoms/Anchor";
import Layout from "@/src/components/04_templates/Layout";
import ajax from "@/src/utils/ajax";
import { RouteComponentProps } from "react-router-dom";
import { GlobalStoreProvider, process } from "@/types";
import { Store } from "@/src/Store";
/* types */
interface Props {
  className?: string;
  result?: any;
  car: any
};
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  const car = props.car;
  return (
    <div className={cn}>
      <h1 className="none">{car.name}のオークションリザルト画面</h1>
      {props.result ? (
        <>
          <p><Image
            alt="gotem画像"
            src={`${process.env.IMG_PATH}/utils/gotem.jpg`}
            width="500px"
          /></p>
          <p>{car.name}を最終価格{props.result.price}万円で入札出来ました。</p>
        </>
      ) : (
        <p className="result-text">{car.name}を入札出来ませんでした。</p>
      )}
      <p><Image
        alt={`${car.id}画像`}
        src={`${process.env.IMG_PATH}/cars/car_${car.id}_01.jpg`}
      /></p>
      <p><Anchor color="halmotor" size="medium" to="/">TOPへ戻る</Anchor></p>
    </div>
  );
};
/* styled */
const StyledComponent = styled(Component)<Props>`
  margin-top: 30px;
  p {
    text-align: center;
    margin-bottom: 20px;
  }
  a {
    text-align: center;
    margin: auto;
  }
`;
/* container */
const Result:  React.FC<RouteComponentProps<{carId: string}>> = (props): JSX.Element => {
  const [car, setCar] = React.useState<any>("");
  const { state, dispatch }: GlobalStoreProvider = React.useContext(Store);
  const [result, setResult] = React.useState<any>();

  React.useEffect(() => {
    ajax({method: "GET", url: `/bids/car/${props.match.params.carId}`})
    ?.then((res: any) => {
      const prices = res.data.map((e: any) => e.price);
      let maxPrice = Math.max.apply(null, prices);
      const max = res.data.filter((item: any) => item.price == maxPrice);
      setResult(max[0]);
    })
    .catch(err => console.error(err));
    ajax({method: "GET", url: `/cars/${props.match.params.carId}`})
    ?.then((res: any) => setCar(res.data))
    .catch(err => console.error(err));

    // ここで/bids/result/{car_id}にget送信する
  }, []);

  React.useEffect(() => {
    if(result && result.user_id == state.user.id) {
      ajax({method: "GET", url: `/bids/result/${result.car_id}`})
      ?.then(res => console.log("ok"))
      .catch(err => console.error(err));
    }
  }, [result]);

  console.log(result);
  
  return (
    <Layout>
    {result && state.user.id == result.user_id ? (
      <StyledComponent car={car} result={result} />
    ) : (
      <StyledComponent car={car} />
    )}
    </Layout>
  );
};

export default Result;