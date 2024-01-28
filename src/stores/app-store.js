import { defineStore } from "pinia";

import { AddressbarColor, date } from "quasar";
import { api } from "boot/axios";
import { showErrorMessage } from "src/functions/notify-messages";

export const useAppStore = defineStore("app", {
  state: () => ({
    actualVersion: "v1.0.4",
    recentVersion: "v1.0.4",
    versionInfo: null,
    dbSettings: null,
    actualBarColor: "",
    pdfFileImg: "images/pdf_file_icon.png",
    customerDetails: [
      { title: "Codigo do Cliente:", value: "0120033004444" },
      { title: "Nome do Cliente:", value: "Olegario Mariquele" },
      { title: "Endereço:", value: "Av. Karl Marx, 995" },
    ],
    rechargesResponse: null,
    isProcessingPayment: null,
    isOnline: false,
  }),
  getters: {
    isPrePayRoute: () => {
      return (actualPathRoute) => !!actualPathRoute.includes("/home");
    },

    isStagingVersion: () => {
      return (
        location.href.includes("staging") ||
        location.href.includes("http://localhost:")
      );
    },


    formatMoney() {
      return (money) => {
        if (
          money &&
          (money.toString().includes(".") || money.toString().includes(","))
        )
          return money + " MT";
        if (money) {
          let moneyFormated =
            money.toString().length <= 3
              ? money + ".00 MT"
              : this.formatDecimals(money) + ".00 MT";

          return moneyFormated;
        }
        return money === 0 ? "0.00 MT" : money;
      };
    },

    formatDecimals: () => {
      return (money) => {
        let number = parseInt("" + money);
        let decimals = 0;
        let decpoint = "."; // Or Number(0.1).toLocaleString().substring(1, 2)
        let thousand = ","; // Or Number(10000).toLocaleString().substring(2, 3)

        let n = Math.abs(number).toFixed(decimals).split(".");
        n[0] = n[0]
          .split("")
          .reverse()
          .map((c, i, a) =>
            i > 0 && i < a.length && i % 3 == 0 ? c + thousand : c
          )
          .reverse()
          .join("");
        let final = (Math.sign(number) < 0 ? "-" : "") + n.join(decpoint);

        return final;
      };
    },

    shareLink() {
      return (payload) => {
        if (navigator.share) {
          navigator
            .share({
              title: payload.title,
              text: payload.text,
              url: payload.textUrl,
            })
            .then(() => {
              // showSuccessMessage('Link compartilhado: ' + linkToShare)
            })
            .catch((err) => {
              showErrorMessage(`Compartilhamento cancelado.`);
            });
        } else {
          showErrorMessage(
            "O seu navegador não suporta a partilha, actualize ou utilize a versão recente de google chrome."
          );
        }
      };
    },
  },
  actions: {
    resetProcessing() {
      this.isProcessingPayment = null;
    },
    resetRechargesResponse() {
      this.rechargesResponse = null;
    },
    setIsConnectedToInternet(isUserConnected) {
      this.isOnline = isUserConnected;
    },

    // =========================================
    // ========  Rotas de pré-pago =============
    // =========================================
    paySimulatedRecharge(payload) {
      this.isProcessingPayment = true;
      // TODO: Garantir que o pagamento só inicia se o user tiver acesso a internet
      // TODO: Se localmente já existir um simulation_id.

      console.log("payload 01: ", payload);

      return api
        .post("/recharges/pay", payload)
        .then((resp) => {
          console.log("payload 02: ", resp);

          if (resp.data.status === "error") {
            this.isProcessingPayment = "error";

            this.handleShowError(resp);

            return resp.data;
          }

          return api
            .post("/recharges/generate", {
              simulation_id: this.rechargesResponse.simulation_id,
            })
            .then((response) => {
              console.log("payload 03: ", response);

              if (response.data.status === "success") {
                let rObject = response.data.data;
                this.rechargesResponse.recharge_code = rObject.recharge_code;
                this.rechargesResponse.amount_paid = rObject.amount_paid;
                this.rechargesResponse.reference = rObject.reference;

                this.isProcessingPayment = "success";

                return this.rechargesResponse;
              }

              this.isProcessingPayment = "error";
              this.handleShowError(response);

              return null;
            });
        })
        .catch((error) => {
          // TODO: Por mostrar os erros de requisição...
          this.isProcessingPayment = "error";
          console.log("payload 04, error...: ", error);

          this.showErrorNotf(
            "Ocorreu um erro. Pagamento não finalizado, tente novamente."
          );

          return false;
        });
    },

    // Busca a última recarga do cliente
    getLastRecharge(meter_number) {
      this.isProcessingPayment = true;

      return api
        .get("/recharges/latest?meter_number=" + meter_number)
        .then((resp) => {
          let itemObject = resp.data.data;

          if (itemObject) {
            this.rechargesResponse = itemObject;
            this.rechargesResponse.meter_number = meter_number;

            this.isProcessingPayment = "success";

            return itemObject;
          }

          this.handleShowError(resp);
          this.isProcessingPayment = "error";

          return resp.data;
        })
        .catch((error) => {
          // TODO: Por mostrar os erros de requisição...
          this.isProcessingPayment = "error";

          this.showErrorNotf(
            "Erro buscando a última recarga. Verifique o número de contador."
          );

          return false;
        });
    },

    setRechargesResponse(payload) {
      this.isProcessingPayment = true;

      return api
        .post("/recharges/simulate", payload)
        .then((resp) => {
          let itemObject = resp.data.data;

          if (itemObject) {
            this.rechargesResponse = itemObject;

            if (itemObject && itemObject.customer) {
              this.customerDetails = [
                {
                  title: "Distrito do Cliente:",
                  value: itemObject.customer.district,
                },
                { title: "Nome do Cliente:", value: itemObject.customer.name },
                { title: "Endereço:", value: itemObject.customer.address },
              ];
            }

            this.isProcessingPayment = "success";

            return itemObject;
          }

          this.handleShowError(resp);
          this.isProcessingPayment = "error";

          return resp.data;
        })
        .catch((error) => {
          // TODO: Por mostrar os erros de requisição...
          this.isProcessingPayment = "error";

          this.showErrorNotf(
            "Ocorreu um erro. Não foi possível iniciar a compra, tente novamente."
          );

          return false;
        });
    },



    showErrorNotf(errorMsg) {
      showErrorMessage({
        message: errorMsg,
        icon: "warning",
      });
    },

    handleShowError(errorResponse) {
      if (errorResponse.data.status === "error") {
        let errorData = errorResponse.data;

        let errorMsg =
          errorData.message || errorData.error_message || errorData.error_code;

        this.showErrorNotf(errorMsg);
      }
    },

    changeAndressBarColor(colorHex) {
      AddressbarColor.set(colorHex);
      this.actualBarColor = colorHex;
    },

    async getTodayDateAndTime(format = "YYYY-MM-DD HH:mm:ss") {
      return date.formatDate(Date.now(), format);
    },

    async formatDateForAdrm(
      desiredDate = Date.now(),
      format = "YYYY-MM-DD HH:mm:ss"
    ) {
      return date.formatDate(desiredDate, format);
    },

    async getInvoiceById(invoiceNumber) {
      if (this.postpaidResponse) {
        return this.postpaidResponse.invoices.find(
          (o) => o.invoice_number === invoiceNumber
        );
      }
      return null;
    },
  },
});
