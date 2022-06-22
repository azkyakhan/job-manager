import api from '@/api'

const fetchShopifyWebhooks = async (payload?:  any): Promise <any>  => {
  return api({
    url: "/service/getShopifyWebhooks",
    method: "post",
    data: payload
  });
}

// TODO: add the service endpoint for the new order webhook, cancelled order webhook, payment status webhook, order return webhook & new product webhook.
const webhookMethods = {
  'NEW_ORDERS': '',
  'CANCELLED_ORDERS': '',
  'PAYMENT_STATUS': '',
  'RETURNS': '',
  'NEW_PRODUCTS': '',
  'DELETE_PRODUCTS': 'service/subscribeProductDeleteWebhook',
  'BULK_OPERATIONS_FINISH': 'service/subscribeFileStatusUpdateWebhook'
} as any

const subscribeWebhook = async (payload?: any, id?: string): Promise <any> => {
  const endpointUrl = webhookMethods[id as string];
  return api ({
    url: endpointUrl ? endpointUrl : '',
    method: 'post',
    data: payload
  })
}

const unsubscribeWebhook = async (payload?: any): Promise <any> => {
  return api ({
    url: 'service/removeShopifyWebhook',
    method: 'post',
    data: payload
  })
}

export const WebhookService = {
  fetchShopifyWebhooks,
  unsubscribeWebhook,
  subscribeWebhook,
}