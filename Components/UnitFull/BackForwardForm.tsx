import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { Button, Text, View } from "native-base";
import { TextInput } from "react-native-paper";
import ViewSmooth from "../Universal/View/ViewSmooth";
import { useAppContext } from "../Universal/API/Context-API/AppContext";
import { isObject } from "lodash";
import SimpleCenteredSpinner from "../Universal/SimpleCenteredSpinner/SimpleCenteredSpinner";
import { KKpolData } from "../Universal/API/Context-API/AppProvider";
import { useAPI } from "../Universal/API/API";

interface BackForwardFormProps {
  extraParams?: {
    unit: KKpolData;
  };
}

const BackForwardForm: React.FC<BackForwardFormProps> = ({ extraParams }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { sendUserRequest } = useAPI();
  const { scaleAll, isWeb, SearchBarTopActive } = useAppContext();

  const isValidEmail = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  }, [email]);

  const isFormComplete = useMemo(() => {
    return name.trim() && message.trim() && isValidEmail;
  }, [name, message, isValidEmail]);

  const handleSubmit = useCallback(async () => {
    if (!isFormComplete) {
      const errorMessage = !name || !email || !message
        ? "Заполните все поля."
        : "Введите корректный Email.";

      if (isWeb) alert(`Ошибка\n${errorMessage}`);
      else Alert.alert("Ошибка", errorMessage);
      return;
    }

    const extraData =
      extraParams?.unit
        ? {
            id: extraParams.unit.id ?? "",
            col: extraParams.unit.col ?? "",
            full_size: extraParams.unit.full_size ?? "",
            name: extraParams.unit.name ?? "",
          }
        : {};

    const result = await sendUserRequest({
      email,
      name,
      question: message,
      extraData,
    });

    const success =
      isObject(result) && "success" in result && result.success;

    if (isWeb) {
      alert(
        success
          ? "Отправлено\nВаше сообщение успешно отправлено."
          : "Что-то не так\nВаше сообщение не отправлено."
      );
    } else {
      Alert.alert(
        success ? "Отправлено" : "Ошибка",
        success
          ? "Ваше сообщение успешно отправлено."
          : "Что-то не так, повторите позже."
      );
    }

    if (success) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [name, email, message, extraParams, isFormComplete]);

  return (
    <ViewSmooth
      style={{
        padding: 20,
        backgroundColor: "#F9F9F9",
        borderWidth: 1,
        borderRadius: 18 * scaleAll,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Задать вопрос
      </Text>

      <TextInput
        editable={!SearchBarTopActive}
        mode="outlined"
        label="Ваше имя"
        value={name}
        onChangeText={setName}
        style={styles.input}
        theme={{ colors: { text: "black" } }}
      />

      <TextInput
        editable={!SearchBarTopActive}
        mode="outlined"
        label="Ваш Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        theme={{ colors: { text: "black" } }}
      />

      <TextInput
        editable={!SearchBarTopActive}
        mode="outlined"
        label="Ваш вопрос"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
        style={[styles.input, { height: 100 }]}
        theme={{ colors: { text: "black" } }}
      />

      <Button
        onPress={async () => {
          setSending(true);
          await handleSubmit();
          setSending(false);
        }}
        style={{
          ...styles.button,
          backgroundColor: isFormComplete ? "#4CAF50" : "#ccc",
          flexDirection: "row",
        }}
        isDisabled={sending || !isFormComplete}
      >
        <Text
          style={[
            styles.buttonText,
            sending && { color: "transparent" },
          ]}
        >
          Отправить
        </Text>
        {sending && (
          <SimpleCenteredSpinner
            height={20 * scaleAll}
            width={20 * scaleAll}
          />
        )}
      </Button>
    </ViewSmooth>
  );
};

const styles = {
  input: {
    backgroundColor: "white",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default React.memo(BackForwardForm);
