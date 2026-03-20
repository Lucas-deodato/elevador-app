import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const NEWS_ITEMS = [
  {
    id: "1",
    tag: "Manutenção",
    title: "Elevador B em revisão preventiva até 18h",
    desc: "Técnicos realizarão inspeção semestral. Use os elevadores A e C durante este período.",
    author: "Administração",
    date: "Hoje, 08:30",
  },
  {
    id: "2",
    tag: "Segurança",
    title: "Novo protocolo de acesso à garagem",
    desc: "A partir de segunda-feira, será necessário biometria para acesso após 22h. Cadastre-se na portaria.",
    author: "Segurança",
    date: "Ontem",
  },
  {
    id: "3",
    tag: "Evento",
    title: "Reunião de condomínio — 25/03 às 19h",
    desc: "Pauta: aprovação do orçamento para reforma da área de lazer e eleição do conselho fiscal.",
    author: "Síndico",
    date: "23/03",
  },
  {
    id: "4",
    tag: "Serviços",
    title: "Internet do salão de festas atualizada",
    desc: "Wi-Fi do salão agora é fibra de 500 Mbps. Nova senha disponível na portaria.",
    author: "TI",
    date: "22/03",
  },
  {
    id: "5",
    tag: "Aviso",
    title: "Mudanças apenas no horário comercial",
    desc: "Reforçamos que mudanças e entregas de grande porte só são permitidas das 08h às 18h em dias úteis.",
    author: "Administração",
    date: "20/03",
  },
];

export default function App() {
  // useState para controle do tema claro/escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safe, { backgroundColor: theme.bg }]}
        edges={["top", "bottom"]}
      >
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={theme.surface}
        />

        {/* Header com título e Switch de tema */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.surface, borderBottomColor: theme.border },
          ]}
        >
          <View>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Informativo do Edifício
            </Text>
            <Text style={[styles.headerSub, { color: theme.text2 }]}>
              Atualização em Andamento...
            </Text>
          </View>
          <View style={styles.toggleRow}>
            <Text style={{ fontSize: 18 }}>{isDarkMode ? "🌙" : "☀️"}</Text>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
              trackColor={{ false: "#ccc", true: "#1a6b3c" }}
              thumbColor={isDarkMode ? "#3dba78" : "#fff"}
            />
          </View>
        </View>

        {/* Banner OTA */}
        <View
          style={[
            styles.otaBanner,
            {
              backgroundColor: theme.accentLight,
              borderBottomColor: theme.border,
            },
          ]}
        >
          <View style={[styles.otaDot, { backgroundColor: theme.accent }]} />
          <Text style={[styles.otaText, { color: theme.accentText }]}>
            OTA update aplicado — build 2.1.3 ativo
          </Text>
        </View>

        {/* ScrollView com lista de notícias */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {NEWS_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              style={[
                styles.card,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View
                style={[styles.tag, { backgroundColor: theme.accentLight }]}
              >
                <Text style={[styles.tagText, { color: theme.accentText }]}>
                  {item.tag.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.cardDesc, { color: theme.text2 }]}>
                {item.desc}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.cardMeta, { color: theme.text2 }]}>
                  {item.author}
                </Text>
                <Text style={[styles.cardMeta, { color: theme.text2 }]}>
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const lightTheme = {
  bg: "#f5f5f0",
  surface: "#ffffff",
  text: "#1a1a1a",
  text2: "#666",
  border: "rgba(0,0,0,0.1)",
  accent: "#1a6b3c",
  accentLight: "#e6f3ec",
  accentText: "#0f6e56",
};

const darkTheme = {
  bg: "#141414",
  surface: "#1e1e1e",
  text: "#f0ede5",
  text2: "#999",
  border: "rgba(255,255,255,0.1)",
  accent: "#3dba78",
  accentLight: "#0f2e1c",
  accentText: "#5dca95",
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  headerSub: { fontSize: 12, marginTop: 2 },
  toggleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  otaBanner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    gap: 8,
  },
  otaDot: { width: 7, height: 7, borderRadius: 4 },
  otaText: { fontSize: 11, fontFamily: "monospace" },
  scrollContent: { padding: 16, gap: 10 },
  card: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 0.5,
    marginBottom: 2,
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 7,
  },
  tagText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.8 },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 5,
  },
  cardDesc: { fontSize: 12, lineHeight: 18 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardMeta: { fontSize: 10 },
});
