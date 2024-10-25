// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addNotification POST /api/add/notification */
export async function addNotificationUsingPost(
  body: API.NotificationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/add/notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getNotification GET /api/get/notification */
export async function getNotificationUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseNotificationsVO_>('/api/get/notification', {
    method: 'GET',
    ...(options || {}),
  });
}
