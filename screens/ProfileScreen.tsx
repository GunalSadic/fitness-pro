import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { User, CreditCard, Bell, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const user = { name: "Alex Doe", email: "alex@example.com", memberSince: "Oct 2023" };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Profile</Text>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Settings Sections */}
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon={<User size={20} color="#000" />} title="Personal Information" />
          <MenuItem icon={<CreditCard size={20} color="#000" />} title="Payment Methods" />
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon={<Bell size={20} color="#000" />} title="Notifications" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable component for the menu rows
function MenuItem({ icon, title }: { icon: any, title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#ccc" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fafafa' },
  container: { padding: 20 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#eee', marginBottom: 30 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginLeft: 8 },
  menuGroup: { backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#eee', overflow: 'hidden', marginBottom: 30 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconContainer: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f4f4f5', alignItems: 'center', justifyContent: 'center' },
  menuItemTitle: { fontSize: 16, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef2f2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#fecaca', gap: 8, marginTop: 10 },
  logoutText: { color: '#dc2626', fontSize: 16, fontWeight: 'bold' },
  memberSince: { textAlign: 'center', marginTop: 24, color: '#888', fontSize: 12 }
});