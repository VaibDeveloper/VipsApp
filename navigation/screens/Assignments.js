// navigation/screens/Assignments.js
import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const VIPS_RED = "#E53935";

const sampleAssignments = [
  { id: "a1", subject: "Java Programming", title: "OOP Concepts Assignment", dueDate: "2025-11-25", completed: false },
  { id: "a2", subject: "Data Structures", title: "Linked List Questions", dueDate: "2025-11-28", completed: false },
  { id: "a3", subject: "AI", title: "Search Algorithms Worksheet", dueDate: "2025-12-01", completed: false },
  { id: "a4", subject: "DBMS", title: "Normalization Exercise", dueDate: "2025-10-30", completed: true },
];

const parseDate = (isoOrYMD) => {
  const d = new Date(isoOrYMD);
  if (!isNaN(d.getTime())) return d;
  const parts = String(isoOrYMD).split("-");
  if (parts.length === 3) return new Date(parts[0], Number(parts[1]) - 1, parts[2]);
  return new Date(isoOrYMD);
};

const formatDateShort = (iso) => {
  const d = parseDate(iso);
  if (isNaN(d.getTime())) return iso;
  const opts = { day: "2-digit", month: "short" };
  return d.toLocaleDateString(undefined, opts);
};

const isOverdue = (item) => {
  const d = parseDate(item.dueDate);
  const today = new Date();
  // compare dates ignoring time
  return d.setHours(0,0,0,0) < today.setHours(0,0,0,0) && !item.completed;
};

const isUpcoming = (item) => {
  const d = parseDate(item.dueDate);
  const today = new Date();
  return d.setHours(0,0,0,0) >= today.setHours(0,0,0,0) && !item.completed;
};

const AssignmentRow = ({ item, onPress, onToggleComplete, onDelete }) => {
  const overdue = isOverdue(item);
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item)} activeOpacity={0.8}>
      <View style={styles.rowLeft}>
        <View style={[styles.subPill, overdue ? styles.subPillOverdue : styles.subPillNormal]}>
          <Text style={styles.subPillText}>{item.subject.slice(0,3).toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.rowCenter}>
        <Text style={[styles.rowTitle, item.completed && styles.textCompleted]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.rowMeta}>
          <Text style={[styles.dueText, overdue && styles.overdueText]}>{formatDateShort(item.dueDate)}</Text>
          {item.completed && <Text style={styles.completedBadge}>Completed</Text>}
        </View>
      </View>

      <View style={styles.rowRight}>
        <TouchableOpacity onPress={() => onToggleComplete(item.id)} style={styles.iconBtn}>
          <Ionicons name={item.completed ? "checkbox" : "square-outline"} size={22} color={VIPS_RED} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Assignments = () => {
  const [assignments, setAssignments] = useState(sampleAssignments);
  const [filter, setFilter] = useState("upcoming"); // all | upcoming | overdue
  const [refreshing, setRefreshing] = useState(false);

  // detail modal
  const [detailVisible, setDetailVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // add modal
  const [addVisible, setAddVisible] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState(""); // expecting YYYY-MM-DD

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // placeholder for refresh (fetch)
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const handlePressItem = (item) => {
    setActiveItem(item);
    setDetailVisible(true);
  };

  const toggleComplete = (id) => {
    setAssignments((prev) => prev.map((a) => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const deleteAssignment = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this assignment?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setAssignments((p) => p.filter((x) => x.id !== id)) },
    ]);
  };

  const filtered = useMemo(() => {
    const list = assignments.slice();
    // sort by due date ascending
    list.sort((a, b) => parseDate(a.dueDate) - parseDate(b.dueDate));
    if (filter === "all") return list;
    if (filter === "upcoming") return list.filter(isUpcoming);
    if (filter === "overdue") return list.filter(isOverdue);
    return list;
  }, [assignments, filter]);

  const addAssignment = () => {
    if (!newSubject.trim() || !newTitle.trim() || !newDueDate.trim()) {
      Alert.alert("Validation", "Please fill all fields. Due date format: YYYY-MM-DD");
      return;
    }
    // naive validation for date
    const parsed = parseDate(newDueDate);
    if (isNaN(parsed.getTime())) {
      Alert.alert("Invalid date", "Please enter due date as YYYY-MM-DD");
      return;
    }
    const id = `a${Date.now()}`;
    const item = { id, subject: newSubject.trim(), title: newTitle.trim(), dueDate: newDueDate.trim(), completed: false };
    setAssignments((p) => [item, ...p]);
    setAddVisible(false);
    setNewSubject("");
    setNewTitle("");
    setNewDueDate("");
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="reader-outline" size={36} color="#bbb" />
      <Text style={styles.emptyText}>No assignments found</Text>
    </View>
  );

  return (
    <View style={styles.safe}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Assignments</Text>
          <Text style={styles.headerSub}>Manage your due work</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setAddVisible(true)} style={styles.addBtn}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={[styles.filterBtn, filter === "upcoming" && styles.filterBtnActive]} onPress={() => setFilter("upcoming")}>
          <Text style={[styles.filterText, filter === "upcoming" && styles.filterTextActive]}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, filter === "overdue" && styles.filterBtnActive]} onPress={() => setFilter("overdue")}>
          <Text style={[styles.filterText, filter === "overdue" && styles.filterTextActive]}>Overdue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, filter === "all" && styles.filterBtnActive]} onPress={() => setFilter("all")}>
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <AssignmentRow
            item={item}
            onPress={handlePressItem}
            onToggleComplete={toggleComplete}
            onDelete={deleteAssignment}
          />
        )}
        ListEmptyComponent={renderEmpty}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={VIPS_RED} />}
        contentContainerStyle={filtered.length === 0 && styles.flatEmptyContainer}
      />

      {/* Detail Modal */}
      <Modal visible={detailVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{activeItem?.title}</Text>
              <TouchableOpacity onPress={() => setDetailVisible(false)}>
                <Ionicons name="close" size={22} color="#444" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>{activeItem?.subject}</Text>
            <Text style={styles.modalLabel}>Due: {activeItem ? formatDateShort(activeItem.dueDate) : ""}</Text>
            <View style={{ height: 12 }} />
            <Text style={styles.modalBody}>
              {/* Placeholder description */}
              {activeItem ? `Details for "${activeItem.title}". Add description or upload links in the real app.` : ""}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 18, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={[styles.modalAction, { marginRight: 10 }]}
                onPress={() => { if (activeItem) toggleComplete(activeItem.id); setDetailVisible(false); }}
              >
                <Text style={styles.modalActionText}>Toggle Complete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalAction, { backgroundColor: "#eee" }]}
                onPress={() => setDetailVisible(false)}
              >
                <Text style={[styles.modalActionText, { color: "#333" }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Modal */}
      <Modal visible={addVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Assignment</Text>
              <TouchableOpacity onPress={() => setAddVisible(false)}>
                <Ionicons name="close" size={22} color="#444" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Subject (e.g. Java)"
              placeholderTextColor="#999"
              value={newSubject}
              onChangeText={setNewSubject}
              style={styles.input}
            />

            <TextInput
              placeholder="Title"
              placeholderTextColor="#999"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />

            <TextInput
              placeholder="Due Date (YYYY-MM-DD)"
              placeholderTextColor="#999"
              value={newDueDate}
              onChangeText={setNewDueDate}
              style={styles.input}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
              <TouchableOpacity style={[styles.modalAction, { marginRight: 10 }]} onPress={addAssignment}>
                <Text style={styles.modalActionText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalAction, { backgroundColor: "#eee" }]} onPress={() => setAddVisible(false)}>
                <Text style={[styles.modalActionText, { color: "#333" }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Assignments;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff"},

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 14 : 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  headerSub: {
    color: "#666",
    marginTop: 2,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: VIPS_RED,
    alignItems: "center",
    justifyContent: "center",
  },

  filters: {
    flexDirection: "row",
    padding: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },

  filterBtnActive: {
    backgroundColor: VIPS_RED,
    borderColor: VIPS_RED,
  },

  filterText: {
    color: "#333",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f6f6f6",
    backgroundColor: "#fff",
  },

  rowLeft: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  subPill: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  subPillNormal: {
    backgroundColor: "#fff6f6",
    borderWidth: 1,
    borderColor: "#fdecec",
  },

  subPillOverdue: {
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#fbeaea",
  },

  subPillText: {
    color: VIPS_RED,
    fontWeight: "700",
  },

  rowCenter: { flex: 1, paddingHorizontal: 12 },

  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  rowMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  dueText: {
    color: "#777",
    fontSize: 13,
  },

  overdueText: {
    color: VIPS_RED,
    fontWeight: "700",
  },

  completedBadge: {
    marginLeft: 10,
    fontSize: 12,
    color: "#4caf50",
    fontWeight: "700",
  },

  rowRight: {
    width: 70,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  iconBtn: {
    padding: 6,
    marginLeft: 6,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },

  emptyText: {
    marginTop: 10,
    color: "#999",
    fontSize: 15,
  },

  flatEmptyContainer: { flex: 1 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "85%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  modalSub: {
    color: "#666",
    marginBottom: 8,
  },

  modalLabel: {
    color: "#444",
    fontWeight: "600",
  },

  modalBody: {
    color: "#333",
    lineHeight: 20,
  },

  modalAction: {
    backgroundColor: VIPS_RED,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  modalActionText: {
    color: "#fff",
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginTop: 8,
  },
});
