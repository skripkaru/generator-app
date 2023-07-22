import React, {useEffect, useState} from "react";
import Head from 'next/head'
import Layout from "@/layout/Layout";
import {Button, Checkbox, Col, Divider, Form, Input, InputNumber, Row} from "antd";

export default function Password() {
  const [code, setCode] = useState<string>('')
  const [length, setLength] = useState<number>(8)
  const [symbols, setSymbols] = useState<string>('')
  const [digits, setDigits] = useState<boolean>(false)
  const [letters, setLetters] = useState<boolean>(false)

  useEffect(() => {
    if (digits && letters) {
      setSymbols('abcdefghijklmnopqrstuvwxyz0123456789')
    } else if (digits) {
      setSymbols('0123456789')
    } else if (letters) {
      setSymbols('abcdefghijklmnopqrstuvwxyz')
    } else {
      setSymbols('abcdefghijklmnopqrstuvwxyz0123456789')
    }
  }, [digits, letters, symbols])

  const generatePassword = () => {
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
        <title>Генератор паролей</title>
        <meta name="description" content="Генератор паролей"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Layout>
        <h1>Генератор паролей</h1>
        <Row>
          <Col xs={24} md={12} lg={8}>
            <Input value={code} size='large'/>
          </Col>
        </Row>
        <Divider/>
        <Form onFinish={generatePassword}>
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item label='Длина'>
                <InputNumber size='large' min={1} max={24} defaultValue={length} onChange={changeLength}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label='Цифры'>
                <Checkbox id='digits' checked={digits} onChange={() => setDigits(!digits)}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label='Строчная латиница'>
                <Checkbox id='letters' checked={letters} onChange={() => setLetters(!letters)}/>
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
