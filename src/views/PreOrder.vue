<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-menu-button slot="start" />
        <ion-title>{{ $t("Pre-order") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main>
        <section>
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ $t("Pre-orders") }}</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Use POs to manage catalog") }}</ion-label>
              <ion-checkbox slot="end" :checked="preOrderManageCatalog" @ionChange="updateJob($event['detail'].checked, jobEnums['PRE_ORDER_CTLG'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Add tags in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="addPreOrderTagInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['ADD_PRODR_TG_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Remove tags in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="removePreOrderTagInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['REMV_PRODR_TG_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Add shipping dates in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="addPreOrderShippingDateInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['ADD_PRODR_SHPG_DTE_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Remove shipping dates in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="removePreOrderShippingDateInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['REMV_PRODR_SHPG_DTE_SHPFY'])"/>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <p class="ion-text-wrap">{{ $t("Transfer pre-order related information to Shopify as tags and meta fields.") }}</p>
              </ion-label>
            </ion-item>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ $t("Backorder") }}</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Use POs to manage catalog") }}</ion-label>
              <ion-checkbox slot="end" :checked="backOrderManageCatalog" @ionChange="updateJob($event['detail'].checked, jobEnums['BACK_ORDER_CTLG'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Add tags in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="addBackOrderTagInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['ADD_BACKODR_TG_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Remove tags in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="removeBackOrderTagInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['REMV_BACKODR_TG_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Add shipping dates in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="addBackOrderShippingDateInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['ADD_BACKODR_SHPG_DTE_SHPFY'])"/>
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Remove shipping dates in Shopify") }}</ion-label>
              <ion-checkbox slot="end" :checked="removeBackOrderShippingDateInShopify" @ionChange="updateJob($event['detail'].checked, jobEnums['REMV_BACKODR_SHPG_DTE_SHPFY'])"/>
            </ion-item>
            <ion-item lines="none">
              <ion-label>
                <p class="ion-text-wrap">{{ $t("Transfer backorder related information to Shopify as tags and meta fields.") }}</p>
              </ion-label>
            </ion-item>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ $t("Auto releasing") }}</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Run daily") }}</ion-label>
              <ion-checkbox :checked="autoReleaseRunDaily" @ionChange="updateJob($event['detail'].checked, jobEnums['AUTO_RELSE_DAILY'], 'EVERYDAY')" />
            </ion-item>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Release preorders")}}</ion-label>
              <ion-button fill="outline" @click="runJob('Release preorders', jobEnums['AUTO_RELSE_DAILY'])">{{ $t("Release") }}</ion-button>
            </ion-item>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap"><p>{{ $t("Auto releasing pre-orders will find pre-orders that have promise dates that have passed and release them for fulfillment.") }}</p></ion-label>
            </ion-item>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ $t("Re-allocate pre-orders") }}</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label class="ion-text-wrap">{{ $t("Allocation") }}</ion-label>
              <ion-button fill="outline" color="danger" slot="end" @click="runJob('Re-allocate pre-orders', jobEnums['REALLOC_PRODR'])">{{ $t("Run reallocation") }}</ion-button>
            </ion-item>
            <ion-item lines="none">
              <ion-label class="ion-text-wrap"><p>{{ $t("Re-allocation will re-calculate promise dates on all pre-orders based on upcoming inventory from purchase orders. Promise dates that were manually adjusted will be overriden.") }}</p></ion-label>
            </ion-item>
          </ion-card> 
        </section>

        <aside class="desktop-only" v-if="isDesktop" v-show="currentJob">
          <JobConfiguration :title="title" :status="currentJobStatus" :type="freqType" :key="currentJob"/>
        </aside>
      </main>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from "@/store";
import { mapGetters } from "vuex";
import { useRouter } from 'vue-router'
import { alertController } from '@ionic/vue';
import JobConfiguration from '@/components/JobConfiguration.vue'
import { isFutureDate } from '@/utils';
import emitter from '@/event-bus';

export default defineComponent({
  name: 'PreOrder',
  components: {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    JobConfiguration
  },
  computed: {
    ...mapGetters({
      getJobStatus: 'job/getJobStatus',
      getJob: 'job/getJob',
      shopifyConfigId: 'user/getShopifyConfigId',
      currentEComStore: 'user/getCurrentEComStore',
      getTemporalExpr: 'job/getTemporalExpr'
    }),
    preOrderManageCatalog(): boolean {
      const status = this.getJobStatus(this.jobEnums["PRE_ORDER_CTLG"]);
      return status && status !== "SERVICE_DRAFT";
    },
    addPreOrderTagInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["ADD_PRODR_TG_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    removePreOrderTagInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["REMV_PRODR_TG_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    addPreOrderShippingDateInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["ADD_PRODR_SHPG_DTE_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    removePreOrderShippingDateInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["REMV_PRODR_SHPG_DTE_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    backOrderManageCatalog(): boolean {
      const status = this.getJobStatus(this.jobEnums["BACK_ORDER_CTLG"]);
      return status && status !== "SERVICE_DRAFT";
    },
    addBackOrderTagInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["ADD_BACKODR_TG_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    removeBackOrderTagInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["REMV_BACKODR_TG_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    addBackOrderShippingDateInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["ADD_BACKODR_SHPG_DTE_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    removeBackOrderShippingDateInShopify(): boolean {
      const status = this.getJobStatus(this.jobEnums["REMV_BACKODR_SHPG_DTE_SHPFY"]);
      return status && status !== "SERVICE_DRAFT";
    },
    autoReleaseRunDaily(): boolean {
      const status = this.getJobStatus(this.jobEnums["AUTO_RELSE_DAILY"]);
      return status && status !== "SERVICE_DRAFT";
    }
  },
  data() {
    return {
      jobEnums: JSON.parse(process.env?.VUE_APP_PRODR_JOB_ENUMS as string) as any,
      jobFrequencyType: JSON.parse(process.env?.VUE_APP_JOB_FREQUENCY_TYPE as string) as any,
      currentJob: '' as any,
      title: 'Automatically list pre-order',
      currentJobStatus: '',
      freqType: '',
      isJobDetailAnimationCompleted: false,
      isDesktop: isPlatform('desktop')
    }
  },
  methods: {
    async updateJob(checked: boolean, id: string, status = 'EVERY_15_MIN') {
      const job = this.getJob(id);

      // TODO: added this condition to not call the api when the value of the select automatically changes
      // need to handle this properly
      if (!job || (checked && job?.status === 'SERVICE_PENDING') || (!checked && job?.status === 'SERVICE_DRAFT')) {
        return;
      }

      job['jobStatus'] = status

      // if job runTime is not a valid date then making runTime as empty
      if (job?.runTime && !isFutureDate(job?.runTime)) {
        job.runTime = ''
      }

      if (!checked) {
        this.store.dispatch('job/cancelJob', job)
      } else if (job?.status === 'SERVICE_DRAFT') {
        this.store.dispatch('job/scheduleService', job)
      } else if (job?.status === 'SERVICE_PENDING') {
        this.store.dispatch('job/updateJob', job)
      }
    },
    async runJob(header: string, id: string) {
      const job = this.getJob(id)
      const jobAlert = await alertController
        .create({
          header,
          message: this.$t('This job will be scheduled to run as soon as possible. There may not be enough time to revert this action.', {space: '<br/><br/>'}),
          buttons: [
            {
              text: this.$t("Cancel"),
              role: 'cancel',
            },
            {
              text: this.$t('Run now'),
              handler: () => {
                if (job) {
                  this.store.dispatch('job/runServiceNow', job)
                }
              }
            }
          ]
        });

      return jobAlert.present();
    },
    async viewJobConfiguration(id: string, title: string, status: string) {
      this.currentJob = this.getJob(this.jobEnums[id])
      this.title = title
      this.currentJobStatus = status
      this.freqType = id && this.jobFrequencyType[id]

      await this.store.dispatch('job/updateCurrentJob', { job: this.currentJob });
      if(!this.isDesktop) {
        this.router.push({name: 'JobDetails', params: { title: this.title, jobId: this.currentJob.jobId, category: "preorder"}});
        return;
      }

      // if job runTime is not a valid date then making runTime as empty
      if (this.currentJob?.runTime && !isFutureDate(this.currentJob?.runTime)) {
        this.currentJob.runTime = ''
      }
      if (this.currentJob && !this.isJobDetailAnimationCompleted) {
        emitter.emit('playAnimation');
        this.isJobDetailAnimationCompleted = true;
      }
    },
    getTemporalExpression(enumId: string) {
      return this.getTemporalExpr(this.getJobStatus(this.jobEnums[enumId]))?.description ?
        this.getTemporalExpr(this.getJobStatus(this.jobEnums[enumId]))?.description :
        this.$t('Disabled')
    }
  },
  mounted () {
    this.store.dispatch("job/fetchJobs", {
      "inputFields":{
        "systemJobEnumId": Object.values(this.jobEnums),
        "systemJobEnumId_op": "in"
      }
    });
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      store,
      router
    };
  },
});
</script>
