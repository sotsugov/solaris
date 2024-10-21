from api.utils.credits import calculate_credits


def test_empty_message():
    message = ""
    expected_result = {
        "credits_used": 1,
        "base_cost": 1,
        "char_count_cost": 0,
        "word_length_cost": 0,
        "third_vowel_cost": 0,
        "length_penalty": 0,
        "unique_word_bonus": 0,
        "palindrome_multiplier": 1,
    }
    assert calculate_credits(message) == expected_result


def test_message_baseline():
    message = "Are there any restrictions on alterations or improvements?"
    expected_result = {
        "credits_used": 5.2,
        "base_cost": 1,
        "char_count_cost": 2.9,
        "word_length_cost": 1.5,
        "third_vowel_cost": 1.8,
        "length_penalty": 0,
        "unique_word_bonus": -2,
        "palindrome_multiplier": 1,
    }
    assert calculate_credits(message) == expected_result
