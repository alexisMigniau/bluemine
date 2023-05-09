import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import Input from "../basics/Input"
import { useContext, useState } from "react";
import Button from "../basics/Button";
import styled from "styled-components";
import { getUser } from "../../service/api";
import { ViewContext } from "../../context/ViewContext";

const SignInButton = styled(Button)`
    width : 100%;
    margin-top : 20px;
`

const Description = styled.h4`
    color : ${props => props.theme.colors.grey};
`

const ErrorLabel = styled.h5`
    color : ${props => props.theme.colors.textPrimary};
    background-color : ${props => props.theme.colors.error + "50"};
    border-color : ${props => props.theme.colors.errorFade};
    border-width : 1px;
    border-style : solid;
    padding : 10px;
    border-radius : 10px;
`

function LoginModal(props) {

    const { t } = useTranslation();

    const {fetchIssues} = useContext(ViewContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("")

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClickSign = async (e) => {
        e.preventDefault()
        const res = await getUser(login, password)

        if(res.error) {
            setError(t('error.network' , {code : res.status, text : res.text}))
        } else {
            setLogin("")
            setError("")
            setPassword("")
            localStorage.setItem("apikey", res.user.api_key);
            fetchIssues()
            props.onClose();
        }
    }

    return (
        <Modal {...props} title={t("login.sign_in")} canClose={false} fullScreen={true}>
            <Description>{t('login.description')}</Description>
            <form onSubmit={handleClickSign}>
                <Input
                    name="login"
                    label={t("login.login")}
                    required
                    value={login}
                    onChange={handleLoginChange}
                />
                <Input
                    name="password"
                    label={t("login.password")}
                    required
                    type={"password"}
                    value={password}
                    onChange={handlePasswordChange}
                />
                <SignInButton type="submit">{t('login.button')}</SignInButton>
            </form>
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </Modal>
    )
}

export default LoginModal;