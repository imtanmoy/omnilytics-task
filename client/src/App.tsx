import {Button, Card, Collapse, message, Spin, Typography} from 'antd';
import React, {useCallback, useState} from 'react';
import {useQuery, useQueryClient} from "react-query";
import styled from "styled-components";
import './App.css';

const {Panel} = Collapse;

const API_URL = process.env.REACT_APP_API_URL || 'http://0.0.0.0:5000';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: auto;
  justify-content: center;
`;

const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;


const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;


const SpinnerContainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;`;


interface RandomObject {
    string: number,
    integer: number,
    alphanumerics: number,
    real_number: number,
    file_link: string,
    file_name: string
}


function App() {
    const queryClient = useQueryClient();
    const [data, setData] = useState<RandomObject | null>(null);

    const {
        isLoading,
        refetch,
    } = useQuery('random', () =>
        fetch(
            `${API_URL}/`
        ).then((res) =>
            res.json()), {
        refetchOnWindowFocus: false,
        enabled: false,
        cacheTime: 0,
        onSuccess: data1 => {
            setData(data1);
        },
        onError: err => {
            message.error("Something went wrong");
        },
        onSettled: () => {
            queryClient.resetQueries();
        }
    });

    const onGenerateClick = useCallback(() => {
        refetch();
    }, [refetch]);


    return (
        <Div>
            <Card>
                <div>
                    <Button type="primary" onClick={onGenerateClick}
                            loading={isLoading}>{!isLoading ? 'Generate' : 'Generating'}</Button>
                </div>
                {!isLoading && data && <ResponseContainer>
                    <div>
                        <Typography.Text>Link:{' '}</Typography.Text>
                        <Typography.Link href={data.file_link} target="blank">{data.file_name}</Typography.Link>
                    </div>
                    <Collapse defaultActiveKey={''} bordered={false}
                              style={{backgroundColor: 'white', marginTop: '20px'}}>
                        <Panel header={<div><Button type="primary">Report</Button></div>} key={'1'} showArrow={false}>
                            <ReportContainer>
                                <Typography.Text>String: <Typography.Text
                                    strong>{data.string}</Typography.Text></Typography.Text>
                                <Typography.Text>Integer: <Typography.Text
                                    strong>{data.integer}</Typography.Text></Typography.Text>
                                <Typography.Text>Alphanumerics: <Typography.Text
                                    strong>{data.alphanumerics}</Typography.Text></Typography.Text>
                                <Typography.Text>Real Number: <Typography.Text
                                    strong>{data.real_number}</Typography.Text></Typography.Text>
                            </ReportContainer>
                        </Panel>
                    </Collapse>
                </ResponseContainer>}
                {isLoading && <SpinnerContainer>
                    <Spin/>
                </SpinnerContainer>}
            </Card>

        </Div>
    );
}

export default App;
