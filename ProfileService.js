const API_BASE_URL = "http://34.116.129.117:8000";

export const ProfileService = {
  // Get all profiles
  async getAllProfiles(page = 0, limit = 100) {
    const response = await fetch(
      `${API_BASE_URL}/profiles?skip=${page * limit}&limit=${limit}`,
    );
    return await response.json();
  },

  // Get profile by user_id_clerk
  async getProfile(userIdClerk) {
    const response = await fetch(`${API_BASE_URL}/profile/${userIdClerk}`);
    if (!response.ok) {
      throw new Error("Profile not found");
    }
    return await response.json();
  },

  // Create new profile
  async createProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    return await response.json();
  },

  // Update profile
  async updateProfile(userIdClerk, profileData) {
    const response = await fetch(`${API_BASE_URL}/profile/${userIdClerk}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    return await response.json();
  },

  // Delete profile
  async deleteProfile(userIdClerk) {
    const response = await fetch(`${API_BASE_URL}/profile/${userIdClerk}`, {
      method: "DELETE",
    });
    return await response.json();
  },

  // Search profiles
  async searchProfiles(query) {
    const response = await fetch(
      `${API_BASE_URL}/profiles/search?query=${query}`,
    );
    return await response.json();
  },
};
