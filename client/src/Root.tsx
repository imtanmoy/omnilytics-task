import {Layout} from 'antd';
import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import styled from "styled-components";
import App from "./App";
import './App.css';

const {Content} = Layout;

const StyledContent = styled(Content)`
  position: relative;
  margin: 24px;
  transition: all 0.2s;
  min-height: 100%;
`;

const queryClient = new QueryClient();

const Root = ()=> {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <StyledContent>
                    <App/>
                </StyledContent>
            </Layout>
        </QueryClientProvider>
    );
}

export default Root;
