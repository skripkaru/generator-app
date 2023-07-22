import React, {useState} from "react";
import Head from 'next/head'
import Layout from "@/layout/Layout";
import {Button, Col, Divider, Form, Input, Row, Slider} from "antd";
import type {SliderMarks} from 'antd/es/slider';


export default function Number() {
  const [range, setRange] = useState<number[]>([0, 100])
  const [total, setTotal] = useState<number | undefined>(undefined)

  const changeRange = (value: number[]) => {
    setRange(value)
  }

  const generateNumber = () => {
    setTotal(Math.round(Math.random() * (range[1] - range[0]) + range[0]))
  }

  const marks: SliderMarks = {
    0: range[0],
    100: range[1],
  };


  return (
    <>
      <Head>
        <title>Генератор чисел</title>
        <meta name="description" content="Генератор чисел"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Layout>
        <h1>Генератор чисел</h1>
        <Row>
          <Col xs={24} md={12} lg={8}>
            <Input size='large' value={total}/>
          </Col>
        </Row>
        <Divider/>
        <Form onFinish={generateNumber}>
          <Row>
            <Col xs={24} md={12} lg={8}>
              <Slider range marks={marks} defaultValue={[range[0], range[1]]} onChange={changeRange}/>
            </Col>
          </Row>
          <Button type='primary' size='large' htmlType='submit'>
            Сгенерировать
          </Button>
        </Form>
      </Layout>
    </>
  )
}
