import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";

type Task = {
  id: string;
  text: string;
  done: boolean;
  createdAt?: any;
};

const DEFAULT_TASKS = [
  "Drink some water",
  "Take a few deep breaths",
  "Eat something nourishing",
  "Stretch your body",
  "Step outside for fresh air",
  "Listen to music",
  "Take a short rest",
  "Write one thought",
  "Spend a calm moment with baby",
  "Do one thing for yourself",
];

export default function DailyCare() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [taskModalVisible, setTaskModalVisible] =
    useState(false);

  const [taskText, setTaskText] = useState("");

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  // --------------------------------------------------
  // LOAD TASKS
  // --------------------------------------------------

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const user = auth.currentUser;

    if (!user) {
      setLoading(false);
      Alert.alert(
        "Login required",
        "Please login again."
      );
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      const userSnapshot = await getDoc(userRef);

      const userData = userSnapshot.exists()
        ? userSnapshot.data()
        : {};

      /*
       * We use this flag to know whether
       * the default 10 goals have already
       * been created.
       */
      const dailyCareInitialized =
        userData.dailyCareInitialized === true;

      const tasksRef = collection(
        db,
        "users",
        user.uid,
        "dailyCareTasks"
      );

      const tasksSnapshot = await getDocs(tasksRef);

      /*
       * FIRST TIME ONLY
       *
       * Create the predefined 10 goals.
       */
      if (
        !dailyCareInitialized &&
        tasksSnapshot.empty
      ) {
        const createdTasks: Task[] = [];

        for (const taskText of DEFAULT_TASKS) {
          const newTaskRef = await addDoc(
            tasksRef,
            {
              text: taskText,
              done: false,
              createdAt: serverTimestamp(),
            }
          );

          createdTasks.push({
            id: newTaskRef.id,
            text: taskText,
            done: false,
          });
        }

        /*
         * Mark Daily Care as initialized.
         *
         * This is VERY important.
         *
         * Even if the mother later deletes
         * all the tasks, the 10 defaults
         * will NOT come back.
         */
        await setDoc(
          userRef,
          {
            dailyCareInitialized: true,
          },
          {
            merge: true,
          }
        );

        setTasks(createdTasks);
      } else {
        /*
         * Existing user:
         * Load whatever tasks currently exist.
         */
        const loadedTasks: Task[] =
          tasksSnapshot.docs.map((item) => ({
            id: item.id,
            text: item.data().text,
            done: item.data().done ?? false,
            createdAt: item.data().createdAt,
          }));

        // Newest tasks first
        loadedTasks.sort((a, b) => {
          const aTime =
            a.createdAt?.toMillis?.() || 0;

          const bTime =
            b.createdAt?.toMillis?.() || 0;

          return aTime - bTime;
        });

        setTasks(loadedTasks);
      }

      setLoading(false);
    } catch (error) {
      console.log(
        "DAILY CARE LOAD ERROR:",
        error
      );

      setLoading(false);

      Alert.alert(
        "Error",
        "Could not load your care goals."
      );
    }
  };

  // --------------------------------------------------
  // TOGGLE TASK
  // --------------------------------------------------

  const toggleTask = async (task: Task) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        "Error",
        "Please login again."
      );
      return;
    }

    try {
      await updateDoc(
        doc(
          db,
          "users",
          user.uid,
          "dailyCareTasks",
          task.id
        ),
        {
          done: !task.done,
        }
      );

      /*
       * Update UI immediately
       */
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === task.id
            ? {
                ...item,
                done: !item.done,
              }
            : item
        )
      );
    } catch (error) {
      console.log(
        "TOGGLE TASK ERROR:",
        error
      );

      Alert.alert(
        "Error",
        "Could not update this task."
      );
    }
  };

  // --------------------------------------------------
  // OPEN ADD TASK
  // --------------------------------------------------

  const openAddTask = () => {
    setEditingTask(null);
    setTaskText("");
    setTaskModalVisible(true);
  };

  // --------------------------------------------------
  // OPEN EDIT TASK
  // --------------------------------------------------

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskText(task.text);
    setTaskModalVisible(true);
  };

  // --------------------------------------------------
  // SAVE TASK
  // --------------------------------------------------

  const saveTask = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert(
        "Error",
        "Please login again."
      );
      return;
    }

    const trimmedText = taskText.trim();

    if (!trimmedText) {
      Alert.alert(
        "Missing goal",
        "Please enter a goal."
      );
      return;
    }

    try {
      // ------------------------------------------
      // EDIT EXISTING TASK
      // ------------------------------------------

      if (editingTask) {
        await updateDoc(
          doc(
            db,
            "users",
            user.uid,
            "dailyCareTasks",
            editingTask.id
          ),
          {
            text: trimmedText,
          }
        );

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === editingTask.id
              ? {
                  ...task,
                  text: trimmedText,
                }
              : task
          )
        );
      }

      // ------------------------------------------
      // ADD NEW TASK
      // ------------------------------------------

      else {
        const newTaskRef = await addDoc(
          collection(
            db,
            "users",
            user.uid,
            "dailyCareTasks"
          ),
          {
            text: trimmedText,
            done: false,
            createdAt: serverTimestamp(),
          }
        );

        const newTask: Task = {
          id: newTaskRef.id,
          text: trimmedText,
          done: false,
        };

        setTasks((currentTasks) => [
          ...currentTasks,
          newTask,
        ]);
      }

      closeTaskModal();
    } catch (error) {
      console.log(
        "SAVE TASK ERROR:",
        error
      );

      Alert.alert(
        "Error",
        "Could not save this goal."
      );
    }
  };

  // --------------------------------------------------
  // DELETE TASK
  // --------------------------------------------------

  const deleteTask = (task: Task) => {
    Alert.alert(
      "Delete goal?",
      `"${task.text}" will be removed from your care list.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            const user = auth.currentUser;

            if (!user) {
              return;
            }

            try {
              await deleteDoc(
                doc(
                  db,
                  "users",
                  user.uid,
                  "dailyCareTasks",
                  task.id
                )
              );

              setTasks((currentTasks) =>
                currentTasks.filter(
                  (item) =>
                    item.id !== task.id
                )
              );
            } catch (error) {
              console.log(
                "DELETE TASK ERROR:",
                error
              );

              Alert.alert(
                "Error",
                "Could not delete this goal."
              );
            }
          },
        },
      ]
    );
  };

  // --------------------------------------------------
  // CLOSE MODAL
  // --------------------------------------------------

  const closeTaskModal = () => {
    setTaskModalVisible(false);
    setTaskText("");
    setEditingTask(null);
  };

  // --------------------------------------------------
  // PROGRESS
  // --------------------------------------------------

  const completed = tasks.filter(
    (task) => task.done
  ).length;

  const progress =
    tasks.length > 0
      ? (completed / tasks.length) * 100
      : 0;

  // --------------------------------------------------
  // MESSAGE
  // --------------------------------------------------

  const getMessage = () => {
    if (completed === 0) {
      return "No pressure. Start with one little thing. ♡";
    }

    if (completed <= 2) {
      return "Small steps count. 🌿";
    }

    if (completed <= 5) {
      return "You're making space for yourself. ✨";
    }

    if (completed <= 8) {
      return "Beautiful progress today. 🌸";
    }

    return "You cared for yourself in many little ways. ♡";
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <Text style={styles.title}>
        Your Little Things
      </Text>

      <Text style={styles.subtitle}>
        Small things are still worth celebrating.
      </Text>

      {/* PROGRESS */}

      <View style={styles.progressCard}>

        <Text style={styles.progressText}>
          {completed} / {tasks.length} completed
        </Text>

        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.message}>
          {getMessage()}
        </Text>

      </View>

      {/* LOADING */}

      {loading && (
        <Text style={styles.loadingText}>
          Loading your care goals...
        </Text>
      )}

      {/* TASKS */}

      {!loading &&
        tasks.map((task) => (
          <View
            key={task.id}
            style={styles.taskCard}
          >

            {/* CHECKBOX */}

            <TouchableOpacity
              style={[
                styles.checkbox,
                task.done &&
                  styles.checked,
              ]}
              onPress={() =>
                toggleTask(task)
              }
            >
              {task.done && (
                <Text style={styles.tick}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            {/* TASK TEXT */}

            <TouchableOpacity
              style={
                styles.taskTextContainer
              }
              onPress={() =>
                toggleTask(task)
              }
            >
              <Text
                style={[
                  styles.taskText,
                  task.done &&
                    styles.doneText,
                ]}
              >
                {task.text}
              </Text>
            </TouchableOpacity>

            {/* EDIT + DELETE */}

            {editMode && (
              <View
                style={
                  styles.actionButtons
                }
              >

                <TouchableOpacity
                  onPress={() =>
                    openEditTask(task)
                  }
                  style={
                    styles.smallButton
                  }
                >
                  <Text
                    style={
                      styles.editIcon
                    }
                  >
                    ✏️
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    deleteTask(task)
                  }
                  style={
                    styles.smallButton
                  }
                >
                  <Text
                    style={
                      styles.deleteIcon
                    }
                  >
                    🗑️
                  </Text>
                </TouchableOpacity>

              </View>
            )}

          </View>
        ))}

      {/* ADD */}

      {editMode && (
        <TouchableOpacity
          style={styles.addTaskButton}
          onPress={openAddTask}
        >
          <Text
            style={styles.addTaskText}
          >
            + Add a care goal
          </Text>
        </TouchableOpacity>
      )}

      {/* EDIT GOALS */}

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          setEditMode(!editMode)
        }
      >
        <Text style={styles.editText}>
          {editMode
            ? "Done Editing"
            : "Edit Goals"}
        </Text>
      </TouchableOpacity>

      {/* ADD / EDIT MODAL */}

      <Modal
        visible={taskModalVisible}
        transparent
        animationType="fade"
        onRequestClose={
          closeTaskModal
        }
      >

        <View
          style={styles.modalOverlay}
        >

          <View style={styles.modalCard}>

            <Text
              style={styles.modalTitle}
            >
              {editingTask
                ? "Edit Care Goal"
                : "Add Care Goal"}
            </Text>

            <Text
              style={styles.modalSubtitle}
            >
              Add something small that
              helps you take care of
              yourself.
            </Text>

            <TextInput
              value={taskText}
              onChangeText={setTaskText}
              placeholder="Example: Read for 10 minutes"
              placeholderTextColor="#9993AD"
              style={styles.input}
              autoFocus
              maxLength={100}
            />

            <View
              style={styles.modalButtons}
            >

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={
                  closeTaskModal
                }
              >
                <Text
                  style={styles.cancelText}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveTask}
              >
                <Text
                  style={styles.saveText}
                >
                  Save
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F0FA",
  },

  contentContainer: {
    padding: 22,
    paddingBottom: 50,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 50,
  },

  subtitle: {
    color: "#77728A",
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
  },

  /* PROGRESS */

  progressCard: {
    backgroundColor: "#E8E4FA",
    padding: 22,
    borderRadius: 24,
    marginBottom: 25,
  },

  progressText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#25213A",
  },

  barBackground: {
    height: 10,
    backgroundColor: "#DDD9F8",
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#5140B5",
    borderRadius: 20,
  },

  message: {
    marginTop: 15,
    color: "#77728A",
    lineHeight: 22,
    fontSize: 14,
  },

  /* TASK */

  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E4FA",
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#5140B5",
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    backgroundColor: "#5140B5",
  },

  tick: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  taskTextContainer: {
    flex: 1,
    marginLeft: 16,
  },

  taskText: {
    fontSize: 16,
    color: "#25213A",
  },

  doneText: {
    textDecorationLine: "line-through",
    color: "#77728A",
  },

  /* EDIT / DELETE */

  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  smallButton: {
    padding: 6,
    marginLeft: 3,
  },

  editIcon: {
    fontSize: 17,
  },

  deleteIcon: {
    fontSize: 17,
  },

  /* ADD */

  addTaskButton: {
    backgroundColor: "#DDD9F8",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    marginTop: 2,
    marginBottom: 5,
  },

  addTaskText: {
    color: "#5140B5",
    fontWeight: "700",
    fontSize: 15,
  },

  /* EDIT GOALS */

  editButton: {
    marginTop: 20,
    backgroundColor: "#5140B5",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  editText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  /* LOADING */

  loadingText: {
    textAlign: "center",
    color: "#77728A",
    marginTop: 20,
    marginBottom: 20,
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(37, 33, 58, 0.45)",
    justifyContent: "center",
    padding: 22,
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#25213A",
  },

  modalSubtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: "#77728A",
    lineHeight: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD9F8",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: "#25213A",
    backgroundColor: "#F2F0FA",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },

  cancelButton: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginRight: 10,
  },

  cancelText: {
    color: "#77728A",
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: "#5140B5",
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 22,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});