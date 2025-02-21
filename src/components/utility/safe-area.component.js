import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight
    ? `${StatusBar.currentHeight}px`
    : "0px"};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
