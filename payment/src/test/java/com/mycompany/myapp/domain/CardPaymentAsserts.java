package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class CardPaymentAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCardPaymentAllPropertiesEquals(CardPayment expected, CardPayment actual) {
        assertCardPaymentAutoGeneratedPropertiesEquals(expected, actual);
        assertCardPaymentAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCardPaymentAllUpdatablePropertiesEquals(CardPayment expected, CardPayment actual) {
        assertCardPaymentUpdatableFieldsEquals(expected, actual);
        assertCardPaymentUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCardPaymentAutoGeneratedPropertiesEquals(CardPayment expected, CardPayment actual) {
        assertThat(expected)
            .as("Verify CardPayment auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCardPaymentUpdatableFieldsEquals(CardPayment expected, CardPayment actual) {
        assertThat(expected)
            .as("Verify CardPayment relevant properties")
            .satisfies(e -> assertThat(e.getCardNumber()).as("check cardNumber").isEqualTo(actual.getCardNumber()))
            .satisfies(e -> assertThat(e.getCardExpiryDate()).as("check cardExpiryDate").isEqualTo(actual.getCardExpiryDate()))
            .satisfies(e -> assertThat(e.getCardHolderName()).as("check cardHolderName").isEqualTo(actual.getCardHolderName()))
            .satisfies(e -> assertThat(e.getCvv()).as("check cvv").isEqualTo(actual.getCvv()))
            .satisfies(e -> assertThat(e.getAmount()).as("check amount").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getAmount()))
            .satisfies(e -> assertThat(e.getPaymentDate()).as("check paymentDate").isEqualTo(actual.getPaymentDate()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCardPaymentUpdatableRelationshipsEquals(CardPayment expected, CardPayment actual) {
        assertThat(expected)
            .as("Verify CardPayment relationships")
            .satisfies(e -> assertThat(e.getPayment()).as("check payment").isEqualTo(actual.getPayment()));
    }
}
