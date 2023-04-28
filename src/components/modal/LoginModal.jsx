import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import Input from "../basics/Input"
import { useState } from "react";
import Button from "../basics/Button";
import styled from "styled-components";
import { getUser } from "../../service/api";

const SignInButton = styled(Button)`
    width : 100%;
    margin-top : 20px;
`

const Description = styled.h4`
    color : ${props => props.theme.colors.textPrimary};
`

function LoginModal(props) {

    const { t } = useTranslation();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClickSign = async (e) => {
        e.preventDefault()
        const user = await getUser(login, password)

        setLogin("")
        setPassword("")

        localStorage.setItem("apikey", user.api_key);

        props.onClose();
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
        </Modal>
    )
}

export default LoginModal;