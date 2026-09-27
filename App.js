import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>Good evening</Text>
            <Text style={styles.greeting}>Welcome back,Rodnie!</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>R</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            placeholder="Search anything..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          <View>
            <Text style={styles.cardLabel}>YOUR OVERVIEW</Text>
            <Text style={styles.cardTitle}>Settle down</Text>
            <Text style={styles.cardDescription}>
              Manage your activities and keep track of your progress.
            </Text>
          </View>

          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>＋</Text>
            </View>
            <Text style={styles.actionTitle}>Create</Text>
            <Text style={styles.actionSubtitle}>New item</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>▣</Text>
            </View>
            <Text style={styles.actionTitle}>Projects</Text>
            <Text style={styles.actionSubtitle}>View projects</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>◷</Text>
            </View>
            <Text style={styles.actionTitle}>Activity</Text>
            <Text style={styles.actionSubtitle}>Recent updates</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.iconBox}>
              <Text style={styles.icon}>⚙</Text>
            </View>
            <Text style={styles.actionTitle}>Settings</Text>
            <Text style={styles.actionSubtitle}>Manage account</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.seeAll}>View all</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityIconText}>✓</Text>
          </View>

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Project updated</Text>
            <Text style={styles.activityDescription}>
              Your project was successfully updated.
            </Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityIconText}>★</Text>
          </View>

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New milestone</Text>
            <Text style={styles.activityDescription}>
              You reached a new milestone today.
            </Text>
            <Text style={styles.time}>Yesterday</Text>
          </View>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityIconText}>↗</Text>
          </View>

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Profile completed</Text>
            <Text style={styles.activityDescription}>
              Your profile information is now complete.
            </Text>
            <Text style={styles.time}>2 days ago</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeNavIcon}>⌂</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▣</Text>
          <Text style={styles.navText}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>◷</Text>
          <Text style={styles.navText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  smallText: {
    fontSize: 14,
    color: '#8A8F98',
    marginBottom: 4,
  },

  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#17191C',
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#17191C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  searchContainer: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ECEEF1',
  },

  searchIcon: {
    fontSize: 25,
    color: '#777',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },

  mainCard: {
    backgroundColor: '#17191C',
    borderRadius: 22,
    padding: 24,
    marginBottom: 28,
  },

  cardLabel: {
    color: '#AEB3BA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },

  cardDescription: {
    color: '#B9BDC3',
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 300,
    marginBottom: 20,
  },

  viewButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },

  viewButtonText: {
    color: '#17191C',
    fontWeight: '600',
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17191C',
  },

  seeAll: {
    fontSize: 13,
    color: '#777D85',
    fontWeight: '600',
  },

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECEEF1',
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#F0F1F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },

  icon: {
    fontSize: 19,
    color: '#17191C',
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#202226',
    marginBottom: 3,
  },

  actionSubtitle: {
    fontSize: 12,
    color: '#8A8F98',
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ECEEF1',
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F1F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  activityIconText: {
    fontSize: 17,
    color: '#17191C',
    fontWeight: '700',
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#202226',
    marginBottom: 4,
  },

  activityDescription: {
    fontSize: 12,
    color: '#858A92',
    lineHeight: 17,
  },

  time: {
    fontSize: 11,
    color: '#A1A5AB',
    marginTop: 6,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
  },

  navIcon: {
    fontSize: 20,
    color: '#9A9EA5',
    marginBottom: 4,
  },

  activeNavIcon: {
    fontSize: 20,
    color: '#17191C',
    marginBottom: 4,
  },

  navText: {
    fontSize: 10,
    color: '#9A9EA5',
  },

  activeNavText: {
    fontSize: 10,
    color: '#17191C',
    fontWeight: '700',
  },
});