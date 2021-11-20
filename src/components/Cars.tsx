/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Text, Row, Col, Link, Spacer, Icon, Flex, Click } from "vcc-ui";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

function capitalize(s: string, all?: boolean) {
  if (!s) return s;
  if (all) return s.toUpperCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function chunk(arr: any, chunkSize: number = 1) {
  if (chunkSize <= 0) throw "Invalid chunk size";
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize)
    chunks.push(arr.slice(i, i + chunkSize));
  console.log(chunks, chunkSize);
  return chunks;
}

interface CarsListProps {
  size: number;
  items: Car[];
}

export default function CarsList(props: CarsListProps) {
  const [items, setItems] = useState<any>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      setItems([]);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function onResize() {
    if (window.innerWidth < 480) setItems(chunk(props.items));
    else if (window.innerWidth < 1024) setItems(chunk(props.items, 2));
    else if (window.innerWidth > 1024) setItems(chunk(props.items, props.size));
  }

  function next() {
    if (current + 1 > items.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  }

  function prev() {
    if (current - 1 < 0) setCurrent(items.length - 1);
    else setCurrent(current - 1);
  }

  return (
    <>
      <Carousel
        selectedItem={current}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        swipeable={true}
      >
        {items.map((cars: Car[], index: number) => (
          <Row key={"slide" + index}>
            {cars.map((car: Car) => (
              <Col
                size={{
                  default: 12,
                  fromM: 2,
                  fromL: Math.floor(12 / props.size),
                }}
                key={car.id}
              >
                <Flex extend={{ alignItems: "baseline" }}>
                  <Text variant="bates" foreground="grey" subStyle="emphasis">
                    {capitalize(car.bodyType, true)}
                  </Text>
                  <Text variant="columbus" subStyle="emphasis">
                    {car.modelName}{" "}
                    <Text variant="kelly" foreground="grey">
                      {car.modelType}
                    </Text>
                  </Text>
                </Flex>
                <Spacer />
                <img alt={car.modelName} src={car.imageUrl} />
                <Flex
                  extend={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Link href={`/learn/${car.id}`} arrow="right">
                    LEARN
                  </Link>
                  <Spacer />
                  <Link href={`/shop/${car.id}`} arrow="right">
                    SHOP
                  </Link>
                </Flex>
              </Col>
            ))}
          </Row>
        ))}
      </Carousel>
      <Flex extend={{ justifyContent: "flex-end", flexDirection: "row" }}>
        <Click onClick={prev}>
          <Icon type="media-previous-32" />
        </Click>
        <Click onClick={next}>
          <Icon type="media-next-32" />
        </Click>
      </Flex>
    </>
  );
}
