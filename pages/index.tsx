import React, {useEffect, useState} from "react";
import Head from 'next/head'
import Layout from "@/layout/Layout";
import {Button, Col, Divider, Form, Input, InputNumber, Row} from "antd";

export default function Home() {
  const [code, setCode] = useState<string>('')
  const [length, setLength] = useState<number>(8)
  const [symbols, setSymbols] = useState<string>('')

  useEffect(() => {
    setSymbols('0123456789')
  }, [])

  const generateArticle = () => {
    let res = ''

    for (let i = 0; i < length; i++) {
      res += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }

    setCode(res)
  }

  const changeLength = (value: number | null) => {
    value && setLength(value)
  }

  return (
    <>
      <Head>
        <title>Генератор артикулов</title>
        <meta name="description" content="Генератор артикулов"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Layout>
        <h1>Генератор артикулов</h1>
        <Row>
          <Col xs={24} md={12} lg={8}>
            <Input size='large' value={code}/>
          </Col>
        </Row>
        <Divider/>
        <Form onFinish={generateArticle}>
          <Row gutter={[16, 16]} align='middle'>
            <Col>
              <Form.Item label='Длина'>
                <InputNumber style={{maxWidth: 60}} size='large' min={1} max={24} defaultValue={length} onChange={changeLength}/>
              </Form.Item>
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
