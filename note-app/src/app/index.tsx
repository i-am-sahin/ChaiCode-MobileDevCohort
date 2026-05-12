import React, { useMemo, useState } from "react";
import {
    FlatList,
    ImageBackground,
    KeyboardAvoidingView,
    ListRenderItem,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    useColorScheme,
    useWindowDimensions,
    View,
    ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

const NOTES: Note[] = [
  {
    id: "1",
    title: "Project Ideas",
    content:
      "Build a smart notes app with dark mode support and responsive layouts using React Native.",
    date: "May 12, 2026",
  },
  {
    id: "2",
    title: "Meeting Notes",
    content:
      "Discussed assignment requirements, responsive design, and UI improvements.",
    date: "May 11, 2026",
  },
  {
    id: "3",
    title: "Shopping List",
    content: "Milk, Coffee, Bread, Rice, Notebook, Mechanical Keyboard.",
    date: "May 10, 2026",
  },
  {
    id: "4",
    title: "Daily Goals",
    content:
      "Practice React Native layouts, improve problem solving, and complete assignments.",
    date: "May 08, 2026",
  },
];

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("My New Note");
  const [content, setContent] = useState("Start writing your thoughts here...");

  const [notes, setNotes] = useState<Note[]>(NOTES);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const theme = useMemo(() => {
    return isDarkMode
      ? {
          background: "#0F172A",
          card: "#1E293B",
          text: "#F8FAFC",
          secondary: "#94A3B8",
          border: "#334155",
          input: "#111827",
          accent: "#6366F1",
        }
      : {
          background: "#F8FAFC",
          card: "#FFFFFF",
          text: "#0F172A",
          secondary: "#64748B",
          border: "#E2E8F0",
          input: "#FFFFFF",
          accent: "#4F46E5",
        };
  }, [isDarkMode]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  const openEditor = (note: Note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const closeEditor = () => {
    setActiveNoteId(null);
  };

  const saveActiveNote = () => {
    if (!activeNoteId) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId ? { ...note, title, content } : note,
      ),
    );
  };

  const renderItem: ListRenderItem<Note> = ({ item }) => {
    const cardStyle: ViewStyle = {
      backgroundColor: theme.card,
      borderColor: theme.border,
    };

    return (
      <Pressable
        onPress={() => openEditor(item)}
        style={[styles.noteCard, cardStyle]}
      >
        <Text style={[styles.noteTitle, { color: theme.text }]}>
          {item.title}
        </Text>

        <Text
          numberOfLines={2}
          style={[styles.notePreview, { color: theme.secondary }]}
        >
          {item.content}
        </Text>

        <Text style={[styles.noteDate, { color: theme.secondary }]}>
          {item.date}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingHorizontal: isTablet ? 28 : 16,
        },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {activeNoteId ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={[
              styles.editorContainer,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
              }}
              style={styles.headerImage}
              imageStyle={styles.headerImageStyle}
            >
              <View style={styles.headerOverlay}>
                <Pressable
                  onPress={closeEditor}
                  style={[
                    styles.actionButton,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>

                <Pressable
                  onPress={saveActiveNote}
                  style={[
                    styles.actionButton,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
              </View>
            </ImageBackground>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Note title"
              placeholderTextColor={theme.secondary}
              style={[
                styles.titleInput,
                {
                  color: theme.text,
                  borderBottomColor: theme.border,
                },
              ]}
            />

            <TextInput
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              placeholder="Write your note here..."
              placeholderTextColor={theme.secondary}
              style={[
                styles.contentInput,
                {
                  color: theme.text,
                },
              ]}
            />
          </View>
        </KeyboardAvoidingView>
      ) : (
        <>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.heading, { color: theme.text }]}>Notes</Text>
              <Text style={[styles.subHeading, { color: theme.secondary }]}>
                Organize your thoughts beautifully
              </Text>
            </View>

            <View style={styles.switchContainer}>
              <Text style={{ color: theme.text, marginRight: 8 }}>Dark</Text>

              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
          </View>

          <TextInput
            placeholder="Search notes..."
            placeholderTextColor={theme.secondary}
            value={search}
            onChangeText={setSearch}
            style={[
              styles.searchInput,
              {
                backgroundColor: theme.input,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
          />

          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: "700",
  },

  subHeading: {
    fontSize: 14,
    marginTop: 4,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  noteCard: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 3,
  },

  noteTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  notePreview: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },

  noteDate: {
    fontSize: 12,
    fontWeight: "600",
  },

  editorContainer: {
    marginTop: 12,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 20,
  },

  headerImage: {
    height: 140,
    justifyContent: "space-between",
  },

  headerImageStyle: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  headerOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  titleInput: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },

  contentInput: {
    minHeight: 180,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    fontSize: 16,
    lineHeight: 26,
  },
});
