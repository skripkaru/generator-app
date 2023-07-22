import React, {ChangeEvent, useEffect, useState} from "react";
import Head from 'next/head'
import Layout from "@/layout/Layout";
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";

export default function Password() {
  const [code, setCode] = useState<string>('')
  const [length, setLength] = useState<string>('8')
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

  const generateArticle = () => {
    let res = ''

    for (let i = 0; i < Number(length); i++) {
      res += symbols.charAt(Math.floor(Math.random() * symbols.length))
    }

    setCode(res)
  }

  const changeLength = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (isNaN(Number(value)) || value[0] === '-' || Number(value) > 24) {
      return
    }

    setLength(value)
  }

  return (
    <>
      <Head>
        <title>Randomizer</title>
        <meta name="description" content="Randomizer"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Layout>
        <h1>Генератор паролей</h1>
        <Input style={{maxWidth: 320}} value={code}/>
        <Divider/>

        <Form onFinish={generateArticle}>
          <Row gutter={[16, 16]}>
            <Col>
              <Form.Item label='Длина'>
                <Input style={{maxWidth: 42}} value={length} onChange={changeLength}/>
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
          <Button type='primary' htmlType='submit'>
            Сгенерировать
          </Button>
        </Form>
      </Layout>
    </>
  )
}
